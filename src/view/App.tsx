import { Outlet, useNavigate, useParams } from "react-router-dom";
import "./styles/globals.scss";
import { useEffect } from "react";
import { listenToAuth } from "../controllers/db/authCont";
import { useSelector } from "react-redux";
import { selectUser } from "../controllers/slices/userSlice";
import { navigateToDocument } from "./appCont";

function App() {
  const user = useSelector(selectUser);
  const params = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    const { statementId } = params;
 
    //set to local storage
    if (statementId) {
      localStorage.setItem("statementId", statementId);
    }

    const unsubscribe = listenToAuth();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      navigateToDocument(params, navigate);

     
    }
  }, [user]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;


