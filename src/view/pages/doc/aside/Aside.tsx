import { useState } from "react";

import AccordionItem from "./asideItem/AsideItem";
import PdfDownloadIcon from "../../../components/icons/PdfDownloadIcon";
import { useParams } from "react-router-dom";
import FileIcon from "../../../components/icons/FileIcon";
import LogoAndNameIcon from "../../../components/icons/LogoAndNameIcon";
import styles from "./Aside.module.scss";
import { useSelector } from "react-redux";
import { sectionsSelector } from "../../../../controllers/slices/statementsSlice";
import { useDocument } from "../../../../controllers/hooks/documentHooks";

function Accordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const { statementId } = useParams<{ statementId: string }>();
  console.log(statementId);
  const { statement } = useDocument(statementId);
  const sections = useSelector(sectionsSelector(statementId));
  console.log(sections);

  const title = statement?.statement.split("\n")[0];

  return (
    <aside className={styles.aside}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <LogoAndNameIcon />
          <p>Fostering collaboration</p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <FileIcon />
          <div className={styles.docTitle}>{title}</div>
        </div>
        {sections.map((st, index) => (
          <AccordionItem
            key={`as-${st.statementId}`}
            statement={st}
            isActiveSection={index === activeIndex}
            setActiveIndex={setActiveIndex}
            sectionIndex={index}
            level={1}
          />
        ))}
        <div className={styles.pdfWrapper}>
          <PdfDownloadIcon />
          <h2 className={styles.pdfText}>Download PDF</h2>
        </div>
      </div>
    </aside>
  );
}

export default Accordion;
