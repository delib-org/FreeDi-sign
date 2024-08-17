import { useState } from "react";

import AsideItem from "./asideItem/AsideItem";
import { useParams } from "react-router-dom";

import LogoAndNameIcon from "../../../components/icons/LogoAndNameIcon";
import styles from "./Aside.module.scss";
import { useSelector } from "react-redux";
import { sectionsSelector } from "../../../../controllers/slices/statementsSlice";
import { useLanguage } from "../../../../controllers/hooks/useLanguage";


function Accordion() {

  const {t, dir} = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const { statementId } = useParams<{ statementId: string }>();
  const sections = useSelector(sectionsSelector(statementId));


  return (
    <aside className={styles.aside}>
      <div className={`${styles.logo} ${dir === "rtl"?styles["logo--rtl"]:null}` }>
        <LogoAndNameIcon />
        <div className={styles.slogan}>{t("Fostering Collaboration")}</div>
      </div>
      <div className={`${styles.content} ${dir === 'rtl'?styles["content--rtl"]:null}`}>
        <div className={styles.title}>
          
          <div className={styles.contentTitle}>{t("Content")}</div>
        </div>
        {sections.map((st, index) => (
          <AsideItem
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
        <div className={styles.ddi}>
          <a href="https://delib.org" target="_blank">{t("From the Deliberative Democracy Institute")}</a>
        </div>
      </div>
    </aside>
  );
}

export default Accordion;
