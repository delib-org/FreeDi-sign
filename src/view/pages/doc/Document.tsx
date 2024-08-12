import styles from "./document.module.scss";
import { useParams } from "react-router-dom";
import { useDocument } from "../../../controllers/hooks/documentHooks";
import Accordion from "./aside/Aside";

import Header from "../../components/header/Header";
import Paper from "../../components/paper/Paper";

import { logOut } from "../../../controllers/db/authCont";
import { selectUser } from "../../../controllers/slices/userSlice";
import { useSelector } from "react-redux";


const Document = () => {
  
  const { statementId } = useParams<{ statementId: string }>();
  const {  isLoading, isError, statement, isAuthorized } =
    useDocument(statementId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: An error occurred.</div>;



const user = useSelector(selectUser)

  if (!isAuthorized)
    return (
      <div>
        <h1>Not authorized</h1>
        <p>{user?.uid} {user?.displayName}</p>
        <button onClick={logOut}>Log out</button>
      </div>
    );


  return (
    <div className={styles.doc}>
      <div className={styles.aside}>
        <Accordion />
      </div>

      <div className={styles.main}>
        <Header statement={statement}/>
        <Paper />
      
      </div>

    </div>
  );
};

export default Document;
