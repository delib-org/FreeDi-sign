
import styles from "./page401.module.scss";


const Page401 = () => {



  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <h1>401 - Unauthorized page</h1>
        
        <a href="https://freedi.tech" className={styles.btn}>
          Go to Homepage
        </a>
		<p >
          From the <a href="https://delib.org">Institute for Deliberative Democracy</a>
        </p>
      </div>
    </div>
  );
};

export default Page401;
