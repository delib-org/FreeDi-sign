import styles from "./document.module.scss";
import { useParams } from "react-router-dom";
import { useDocument } from "../../../controllers/hooks/documentHooks";
import Aside from "./aside/Aside";
import Paper from "../../components/paper/Paper";

import PaperHeader from "../../components/paper/header/PaperHeader";
import { createContext, useState } from "react";
import { Role } from "delib-npm";
import Modal from "../../components/modal/Modal";
import DocumentInfo from "../../components/info/DocumentInfo";
import { useSignatures } from "../../../controllers/hooks/signHooks";
import Page401 from "../page401/Page401";

export const RoleContext = createContext<Role>(Role.unsubscribed);

const Document = () => {
  const [showInfo, setShowInfo] = useState(false);

  const { statementId } = useParams<{ statementId: string }>();
  const { isLoading, isError, statement, isAuthorized, role } =
    useDocument();
  const signatures = useSignatures(statementId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: An error occurred.</div>;


  // useEffect(() => {
  //   if (!statementId) return;

  // }, [statementId]);

  if (!isAuthorized)
    return (<Page401 />);

  return (
    <RoleContext.Provider value={role}>
      <div className={styles.doc}>
        <div className={styles.aside}>
          <Aside />
        </div>

        <div className={styles.main}>
          <PaperHeader statement={statement} setShowInfo={setShowInfo}/>
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
      </div>
    </RoleContext.Provider>
  );
};

export default Document;
