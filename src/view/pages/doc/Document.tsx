import styles from "./document.module.scss";
import { useParams } from "react-router-dom";
import { useDocument } from "../../../controllers/hooks/documentHooks";
import Aside from "./aside/Aside";
import Paper from "../../components/paper/Paper";

import PaperHeader from "../../components/paper/header/PaperHeader";
import { useEffect, useState } from "react";
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
import { DocumentContext, handleSetUserEnteredPage } from "./documentCont";
import { selectApprovalsByDocId } from "../../../controllers/slices/approvalSlice";
import { setEvaluationSettings } from "../../../controllers/slices/evaluationSlice";
import {
  selectUser,
  selectUserData,
  setUserData,
} from "../../../controllers/slices/userSlice";
import SigninForm from "../../components/signinForm/SigninForm";
import { getUserData } from "../../../controllers/db/user/getUserData";
import { setSegmentation } from "../../../controllers/db/segmentation/setSegmentation";

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
  const [maxViewed, setMaxViewed] = useState(0);

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
    const newMaxViewed = Math.max(...paragraphs.map((p) => p.viewed?.individualViews || 0));
    if (newMaxViewed !== maxViewed) {
      setMaxViewed(newMaxViewed);
    }
  }, [paragraphs, maxViewed]);

  useEffect(() => {
    if (user && !userData) {
    
      getUserData(undefined, statementId).then((userData) => {
     
        dispatch(setUserData(userData));
      });
    }
  }, [user, userData, dispatch, statementId]);

  useEffect(() => {
    //TODO: remove this when the the settings can be achieved from the db
    if (statementId)
      dispatch(
        setEvaluationSettings({
          statementId: statementId,
          approve: false,
          comment: true,
          importance: false,
          evaluations: true,
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
      <DocumentContext.Provider value={{ role, maxViewed, document:statement}}>
      <div className={styles.doc}>
        <div className={styles.aside}>
          <Aside role={role} />
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
      </DocumentContext.Provider>
  );
};

export default Document;
