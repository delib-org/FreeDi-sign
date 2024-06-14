import React from "react";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "../../../controllers/db/authCont";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    // navigate('/');
    googleLogin();
  };

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
