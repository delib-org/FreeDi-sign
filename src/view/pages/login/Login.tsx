import React from "react";
import styles from "./Login.module.scss";
import { googleLogin } from "../../../controllers/db/authCont";

const Login: React.FC = () => {

  const handleGoogleLogin = () => {
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
