import styles from "./document.module.scss";
import { useParams } from "react-router-dom";
import { useDocument } from "../../../controllers/hooks/documentHooks";
import Aside from "./aside/Aside";
import Paper from "../../components/paper/Paper";

import { logOut } from "../../../controllers/db/authCont";
import { selectUser } from "../../../controllers/slices/userSlice";
import { useSelector } from "react-redux";
import PaperHeader from "../../components/paper/header/PaperHeader";
import { createContext, useState } from "react";
import { Role } from "delib-npm";
import Modal from "../../components/modal/Modal";
import DocumentInfo from "../../components/info/DocumentInfo";
import { useSignatures } from "../../../controllers/hooks/signHooks";

export const RoleContext = createContext<Role>(Role.unsubscribed);

const Document = () => {
  const [showInfo, setShowInfo] = useState(false);

  const { statementId } = useParams<{ statementId: string }>();
  const { isLoading, isError, statement, isAuthorized, role } =
    useDocument(statementId);
  const signatures = useSignatures(statementId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: An error occurred.</div>;

  const user = useSelector(selectUser);

  // useEffect(() => {
  //   if (!statementId) return;

  // }, [statementId]);

  if (!isAuthorized)
    return (
      <div>
        <h1>Not authorized</h1>
        <p>
          {user?.uid} {user?.displayName}
        </p>
        <button onClick={logOut}>Log out</button>
      </div>
    );

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
