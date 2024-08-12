import { useState } from "react";

import AsideItem from "./asideItem/AsideItem";
import PdfDownloadIcon from "../../../components/icons/PdfDownloadIcon";
import { useParams } from "react-router-dom";
import FileIcon from "../../../components/icons/FileIcon";
import LogoAndNameIcon from "../../../components/icons/LogoAndNameIcon";
import styles from "./Aside.module.scss";
import { useSelector } from "react-redux";
import { sectionsSelector } from "../../../../controllers/slices/statementsSlice";


function Accordion() {

  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const { statementId } = useParams<{ statementId: string }>();
  const sections = useSelector(sectionsSelector(statementId));


  return (
    <aside className={styles.aside}>
      <div className={styles.logo}>
        <LogoAndNameIcon />
        <div className={styles.slogan}>Fostering collaboration</div>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          
          <div className={styles.contentTitle}>Content</div>
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
      </div>
    </aside>
  );
}

export default Accordion;
