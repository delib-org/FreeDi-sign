import { useState } from "react";

import AccordionItem from "./asideItem/AsideItem";
import PdfDownloadIcon from "../../../components/icons/PdfDownloadIcon";
import { useParams } from "react-router-dom";
import FileIcon from "../../../components/icons/FileIcon";
import LogoAndNameIcon from "../../../components/icons/LogoAndNameIcon";
import styles from "./Aside.module.scss";
import { useSelector } from "react-redux";
import {
  sectionsSelector,
  statementSelector,
} from "../../../../controllers/slices/statementsSlice";

function Accordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const { statementId } = useParams<{ statementId: string }>();

  const statement = useSelector(statementSelector(statementId));
  const sections = useSelector(sectionsSelector(statementId));

  const title = statement?.statement.split("\n")[0];

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.headerWrapper}>
          <div className={styles.headerLogo}>
            <LogoAndNameIcon />
            <p>Fostering collaboration</p>
          </div>
          <div className={styles.headerTitle}>
            <FileIcon />
            <h1 className={styles.header}>{title}</h1>
          </div>
        </div>
        <div className={styles.accordionWrapper}>
          {sections.map((st, index) => (
            <AccordionItem
              key={`as-${st.statementId}`}
              statement={st}
              isActiveSection={index === activeIndex}
              setActiveIndex={setActiveIndex}
              sectionIndex={index}
            />
          ))}
        </div>
      </div>
      <div className={styles.pdfWrapper}>
        <PdfDownloadIcon />
        <h2 className={styles.pdfText}>Download PDF</h2>
      </div>
    </div>
  );
}

export default Accordion;
