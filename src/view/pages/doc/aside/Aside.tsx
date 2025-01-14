import LogoAndNameIcon from "../../../components/icons/LogoAndNameIcon";
import styles from "./Aside.module.scss";

import {
  useLanguage,
} from "../../../../controllers/hooks/useLanguage";

//icons
// import USAFlag from "../../../../assets/icons/usaFlag.svg?react";
// import IsraelFlag from "../../../../assets/icons/israelFlag.svg?react";
import TOC from "../toc/TableOfContent";


import BottomAside from "./bottomAside/BottomAside";

function Aside() {
  const { t, dir } = useLanguage();

  // function handleToggleLanguage() {
  //   if (currentLanguage === LanguagesEnum.he) changeLanguage(LanguagesEnum.en);
  //   else changeLanguage(LanguagesEnum.he);
  // }

  return (
    <aside className={styles.aside}>
      <a
      href="https://freedi.co" target="_blank" rel="noreferrer"
        className={`${styles.logo} ${
          dir === "rtl" ? styles["logo--rtl"] : null
        }`}
      >
        <LogoAndNameIcon />
        <div className={styles.slogan}>{t("Fostering Collaboration")}</div>
      </a>
      <TOC isAside={true} />
      
     
      <BottomAside />
      <div className={styles.ddi}>
        {/* <button className={styles.button} onClick={handleToggleLanguage}>
          {currentLanguage === LanguagesEnum.en ? <IsraelFlag /> : <USAFlag />}
        </button> */}
        <a href="https://delib.org" target="_blank">
          {t("From the Deliberative Democracy Institute")}
        </a>
      </div>
    </aside>
  );
}

export default Aside;
