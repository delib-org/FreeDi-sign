import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import "./styles/globals.scss";
import { useEffect } from "react";
import { anonymousLogin, listenToAuth } from "../controllers/db/authCont";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setSubscription } from "../controllers/slices/userSlice";
import { useLanguage } from "../controllers/hooks/useLanguage";
import { getSubscription } from "../controllers/db/subscriptions/getSubscriptions";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log(user);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(user?.isAnonymous, "userEffect");
    if (pathElements.includes("doc-anonymous")) {
      if (!user) anonymousLogin();
      navigate(`/doc-anonymous/${params.statementId}`);
    } else {
      if (!user) {
        navigate("/login");
      } else {
        const statementId = localStorage.getItem("statementId");
        if (!statementId) return;
        getSubscription(statementId).then((sub) => {
          if (sub) {
            dispatch(setSubscription(sub));
            navigate(`/doc/${statementId}`);
          } else {
            dispatch(setSubscription(null));
            navigate(`/401`);
          }
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div style={{ direction: dir, fontFamily: "Assistant, sans-serif" }}>
      <Outlet />
    </div>
  );
}

export default App;
