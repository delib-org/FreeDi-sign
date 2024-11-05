import React, { useEffect } from "react";
import styles from "./Login.module.scss";
import { googleLogin } from "../../../controllers/db/authCont";
import { useSelector } from "react-redux";
import { selectUser } from "../../../controllers/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {

  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googleLogin();
  };

  useEffect(() => {
    if (user?.isAnonymous === false) {
      console.info("User is logged in");
      const statementId = localStorage.getItem("statementId");
      navigate(`/doc/${statementId}`);

    }
  }, [navigate, user]);

  return (
    <div className={styles.container}>
      <h1 className={styles["container__title"]}>Login</h1>
      <button className={styles.googleButton} onClick={handleGoogleLogin}>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
