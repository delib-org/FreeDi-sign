import {FC} from 'react';
import LogoAndNameIcon from "../../../components/icons/LogoAndNameIcon";
import styles from "./Aside.module.scss";

import {
  LanguagesEnum,
  useLanguage,
} from "../../../../controllers/hooks/useLanguage";

//icons
import USAFlag from "../../../../assets/icons/usaFlag.svg?react";
import IsraelFlag from "../../../../assets/icons/israelFlag.svg?react";
import TOC from "../toc/TOC";
import CSVDownloadButton from "../../../components/buttons/downloadCSV/DownloadCSV";
import { Role } from "delib-npm";

interface Props{
  role: Role;
}

function Aside({role}: Props) {
  const { t, dir, currentLanguage, changeLanguage } = useLanguage();

  function handleToggleLanguage() {
    if (currentLanguage === LanguagesEnum.he) changeLanguage(LanguagesEnum.en);
    else changeLanguage(LanguagesEnum.he);
  }

  return (
    <aside className={styles.aside}>
      <div
        className={`${styles.logo} ${
          dir === "rtl" ? styles["logo--rtl"] : null
        }`}
      >
        <LogoAndNameIcon />
        <div className={styles.slogan}>{t("Fostering Collaboration")}</div>
      </div>
      <TOC isAside={true} />
      <div className={styles.ddi}>
        <button className={styles.button} onClick={handleToggleLanguage}>
          {currentLanguage === LanguagesEnum.en ? <IsraelFlag /> : <USAFlag />}
        </button>
        <a href="https://delib.org" target="_blank">
          {t("From the Deliberative Democracy Institute")}
        </a>
      </div>
      {role === Role.admin && <CSVDownloadButton />}
    </aside>
  );
}

export default Aside;
