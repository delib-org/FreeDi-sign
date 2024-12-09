import styles from "./document.module.scss";
import { useParams } from "react-router-dom";
import { useDocument } from "../../../controllers/hooks/documentHooks";
import Aside from "./aside/Aside";
import Paper from "../../components/paper/Paper";

import PaperHeader from "../../components/paper/header/PaperHeader";
import { createContext, useEffect, useState } from "react";
import { Role, Signature } from "delib-npm";
import Modal from "../../components/modal/Modal";
import DocumentInfo from "../../components/info/DocumentInfo";
import { useSignatures } from "../../../controllers/hooks/signHooks";
import Page401 from "../page401/Page401";
import HourGlassLoader from "../../components/loaders/HourGlassLoader";
import Comments from "./comments/Comments";
import { useDispatch, useSelector } from "react-redux";
import {
  commentsSelector,
  updateShowComments,
} from "../../../controllers/slices/commentsSlice";
import { useLanguage } from "../../../controllers/hooks/useLanguage";

import { listenToMySignature } from "../../../controllers/db/signatures/getSignatures";
import {
  documentParagraphsSelector,
  mySignaturesSelector,
} from "../../../controllers/slices/statementsSlice";
import { handleSetUserEnteredPage } from "./documentCont";
import { selectApprovalsByDocId } from "../../../controllers/slices/approvalSlice";
import { setEvaluation } from "../../../controllers/slices/evaluationSlice";
import {
  selectUser,
  selectUserData,
  setUserData,
} from "../../../controllers/slices/userSlice";
import SigninForm from "../../components/signinForm/SigninForm";
import { getUserData } from "../../../controllers/db/user/getUserData";
import { setSegmentation } from "../../../controllers/db/segmentation/setSegmentation";

export const RoleContext = createContext<Role>(Role.unsubscribed);

const Document = () => {
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const { statementId } = useParams<{ statementId: string }>();
  const user = useSelector(selectUser);
  const userData = useSelector(selectUserData);
  const { showComments } = useSelector(commentsSelector);
  const mySignature: Signature | undefined = useSelector(
    mySignaturesSelector(statementId)
  );
  const paragraphs = useSelector(documentParagraphsSelector(statementId || ""));
  const rejected = useSelector(
    selectApprovalsByDocId(statementId || "")
  ).filter((approval) => approval.approval === false);
  const approved = paragraphs.length - rejected.length;

  const [showInfo, setShowInfo] = useState(false);

  const { isLoading, isError, statement, isAuthorized, role } = useDocument();
  const signatures = useSignatures(statementId);

  //use effects
  useEffect(() => { //TODO: remove this when the the settings can be achieved from the db
    if (statementId && role === Role.admin) setSegmentation(statementId);
  }, [statementId, role]);

  useEffect(() => {
    if (statement) {
      //set the title of the page
      document.title = `FreeDi-sign - ${statement.statement}`;
    }
  }, [statement]);

  useEffect(() => {
    if (user && !userData) {
      console.log("role", user);
      getUserData(undefined, statementId).then((userData) => {
        console.log(userData);
        dispatch(setUserData(userData));
      });
    }
  }, [user, userData, dispatch]);

  useEffect(() => {
    //TODO: remove this when the the settings can be achieved from the db
    if (statementId)
      dispatch(
        setEvaluation({
          statementId: statementId,
          approve: false,
          comment: true,
          importance: false,
        })
      );
  }, [statementId, dispatch]);

  useEffect(() => {
    let unsubscribed = () => {
      return;
    };
    if (isAuthorized && statementId) {
      unsubscribed = listenToMySignature(statementId);
    }

    return () => {
      unsubscribed();
    };
  }, [isAuthorized, statementId]);

  useEffect(() => {
    if (!mySignature && statement)
      handleSetUserEnteredPage(statement, paragraphs.length, approved);
  }, [mySignature, paragraphs.length, statement, approved]);

  function handleShowComments(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    if (event.target === event.currentTarget) {
      event.stopPropagation();
      dispatch(updateShowComments(!showComments));
    }
  }

  if (isLoading)
    return (
      <div className={styles.loader}>
        <h2>FreeDi - sign</h2>
        <HourGlassLoader />
        <div>{t("Loading")}...</div>
      </div>
    );
  if (isError) return <div>Error: An error occurred.</div>;

  if (!isAuthorized) return <Page401 />;

  return (
    <RoleContext.Provider value={role}>
      <div className={styles.doc}>
        <div className={styles.aside}>
          <Aside />
        </div>

        <div className={styles.main}>
          <PaperHeader statement={statement} setShowInfo={setShowInfo} />
          <Paper />
        </div>
        {showInfo && (
          <Modal>
            <DocumentInfo
              statement={statement}
              signatures={signatures}
              setShowInfo={setShowInfo}
            />
          </Modal>
        )}
        {showComments && (
          <div>
            <Modal onClick={handleShowComments}>
              <Comments />
            </Modal>
          </div>
        )}
        {!userData && role !== Role.admin && (
          <Modal>
            <SigninForm />
          </Modal>
        )}
      </div>
    </RoleContext.Provider>
  );
};

export default Document;
