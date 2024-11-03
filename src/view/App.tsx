import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import "./styles/globals.scss";
import { useEffect } from "react";
import { anonymousLogin, listenToAuth } from "../controllers/db/authCont";
import { useSelector } from "react-redux";
import { selectUser } from "../controllers/slices/userSlice";
import { navigateToDocument } from "./appCont";
import { useLanguage } from "../controllers/hooks/useLanguage";

function App() {
  const user = useSelector(selectUser);
  const params = useParams();
  const { pathname } = useLocation();
  const pathElements = pathname.split("/");

  const { dir } = useLanguage();

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
  
    if (pathElements.includes("doc-anonymous")) {
      if (!user) anonymousLogin();
      navigate(`/doc-anonymous/${params.statementId}`);
    }

    if (!user) {
      navigate("/login");
    } else {
      
    }
  }, [user]);

  return (
    <div style={{ direction: dir, fontFamily: "Assistant, sans-serif" }}>
      <Outlet />
    </div>
  );
}

export default App;
