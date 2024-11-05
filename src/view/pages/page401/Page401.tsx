import { useNavigate } from "react-router-dom";
import styles from "./page401.module.scss";
import { logOut } from "../../../controllers/db/authCont";

const Page401 = () => {
  const navigate = useNavigate();

  function handleGoToLogin() {
    logOut();
    setTimeout(() => {
      navigate("/login");
    }, 500);
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <h1>401 - Unauthorized page</h1>
        <button onClick={handleGoToLogin} className={styles.btn}>
          Go to Login
        </button>
        <a href="https://freedi.tech" className={styles.btn}>
          Go to Homepage
        </a>
        <p>
          From the{" "}
          <a href="https://delib.org">Institute for Deliberative Democracy</a>
        </p>
      </div>
    </div>
  );
};

export default Page401;
