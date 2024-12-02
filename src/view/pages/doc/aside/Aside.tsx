import { FC, useState } from "react";

import AsideItem from "./asideItem/AsideItem";
import { useParams } from "react-router-dom";

import LogoAndNameIcon from "../../../components/icons/LogoAndNameIcon";
import styles from "./Aside.module.scss";
import { useSelector } from "react-redux";
import { sectionsSelector } from "../../../../controllers/slices/statementsSlice";
import {
  LanguagesEnum,
  useLanguage,
} from "../../../../controllers/hooks/useLanguage";

//icons
import USAFlag from "../../../../assets/icons/usaFlag.svg?react";
import IsraelFlag from "../../../../assets/icons/israelFlag.svg?react";

interface Props {
  isTOC?: boolean;
}

function Aside({ isTOC }: Props) {
  const { t, dir, currentLanguage, changeLanguage } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const { statementId } = useParams<{ statementId: string }>();
  const sections = useSelector(sectionsSelector(statementId));

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
      <div
        className={`${styles.content} ${
          dir === "rtl" ? styles["content--rtl"] : null
        }`}
      >
        <div className={styles.title}>
          <div className={styles.contentTitle}>{t("Content")}</div>
        </div>
        {sections.map((st, index) => (
          <AsideItem
            isTOC={isTOC}
            key={`as-${st.statementId}`}
            statement={st}
            isActiveSection={index === activeIndex}
            setActiveIndex={setActiveIndex}
            sectionIndex={index}
            level={1}
          />
        ))}
        {/* <div className={styles.pdfWrapper}>
          <PdfDownloadIcon />
          <h2 className={styles.pdfText}>Download PDF</h2>
        </div> */}
      </div>
      <div className={styles.ddi}>
        <button className={styles.button} onClick={handleToggleLanguage}>
          {currentLanguage === LanguagesEnum.en ? <IsraelFlag /> : <USAFlag />}
        </button>
        <a href="https://delib.org" target="_blank">
          {t("From the Deliberative Democracy Institute")}
        </a>
      </div>
    </aside>
  );
}

export default Aside;
