import { Outlet, useParams } from "react-router-dom";
import "./styles/globals.scss";
import { useEffect } from "react";
import { listenToAuth } from "../controllers/db/authCont";
import { useLanguage } from "../controllers/hooks/useLanguage";

function App(){ 
  const params = useParams();

  const { dir } = useLanguage();

  useEffect(() => {
    const { statementId } = params;

    listenToAuth();

    //set to local storage
    if (statementId) {
      localStorage.setItem("statementId", statementId);
    }

    const unsubscribe = listenToAuth();

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ direction: dir, fontFamily: "Assistant, sans-serif" }}>
      <Outlet />
    </div>
  );
}

export default App;
