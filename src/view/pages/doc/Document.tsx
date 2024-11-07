import styles from "./document.module.scss";
import { useParams } from "react-router-dom";
import { useDocument } from "../../../controllers/hooks/documentHooks";
import Aside from "./aside/Aside";
import Paper from "../../components/paper/Paper";

import PaperHeader from "../../components/paper/header/PaperHeader";
import { createContext, useEffect, useState } from "react";
import { Role } from "delib-npm";
import Modal from "../../components/modal/Modal";
import DocumentInfo from "../../components/info/DocumentInfo";
import { useSignatures } from "../../../controllers/hooks/signHooks";
import Page401 from "../page401/Page401";
import HourGlassLoader from "../../components/loaders/HourGlassLoader";
import Comments from "./comments/Comments";
import { useDispatch, useSelector } from "react-redux";
import { commentsSelector, updateShowComments } from "../../../controllers/slices/commentsSlice";
import { useLanguage } from "../../../controllers/hooks/useLanguage";
import Popup from "../../components/popup/Popup";
import { listenToMySignature } from "../../../controllers/db/signatures/getSignatures";

export const RoleContext = createContext<Role>(Role.unsubscribed);

const Document = () => {
  const dispatch = useDispatch();
  const {t} = useLanguage();
  const { showComments } = useSelector(commentsSelector);
  const [showInfo, setShowInfo] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const { statementId } = useParams<{ statementId: string }>();
  const { isLoading, isError, statement, isAuthorized, role } = useDocument();
  const signatures = useSignatures(statementId);

useEffect(() => {
  let unsubscribed = ()=>{return;};
  if(isAuthorized && statementId){
    unsubscribed = listenToMySignature(statementId);
  }

  return ()=>{
    unsubscribed();
  }
},[isAuthorized, statementId]);

  function handleShowComments(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (event.target === event.currentTarget) {
      event.stopPropagation();
      dispatch(updateShowComments(!showComments));
    }
  }

  function handleShowPopup(show:boolean){
    setShowPopup(show);
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
        {showPopup&&<Popup setShowPopup={handleShowPopup} />}
      </div>
    </RoleContext.Provider>
  );
};

export default Document;
