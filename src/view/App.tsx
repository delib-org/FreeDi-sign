import { Outlet, useNavigate } from "react-router-dom";
import "./styles/globals.scss";
import { useEffect } from "react";
import { listenToAuth } from "../controllers/db/authCont";
import { useSelector } from "react-redux";
import { selectUser } from "../controllers/slices/userSlice";

function App() {
  const user = useSelector(selectUser);
const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = listenToAuth();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/doc/233c4d13-8617-4cc9-8726-ee6039215a28");
    }
  }, [user]);

  return (
    <>

  
        <Outlet />
    
    </>
  );
}

export default App;
