import { useState } from "react";
import styles from "./accordion.module.scss";
import AccordionItem from "./AccordionItem";
import PdfDownloadIcon from "../icons/PdfDownloadIcon";
import { useParams } from "react-router-dom";
import { useDocument } from "../../../controllers/hooks/documentHooks";
import {
  DocumentObject,
  statementsToDocument,
} from "../../../controllers/general.ts/statement_helpers";
import FileIcon from "../icons/FileIcon";
import LogoAndNameIcon from "../icons/LogoAndNameIcon";

function Accordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const { statementId } = useParams<{ statementId: string }>();
  const { statements, isLoading, isError, docStatement, isAuthorized } =
    useDocument(statementId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: An error occurred.</div>;

  const title = docStatement?.statement.split("\n")[0].split("*")[1];
  

  const document: DocumentObject | undefined = statementsToDocument({
    section: docStatement,
    statements,
  });

  // section={section}
  // isActiveSection={index === activeIndex}
  // key={index}
  // setActiveIndex={setActiveIndex}
  // sectionIndex={index}
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.headerWrapper}>
          <div className={styles.headerLogo}>
            <LogoAndNameIcon />
            <p>for Nordia community</p>
          </div>
          <div className={styles.headerTitle}>
            <FileIcon />
            <h1 className={styles.header}>
              {title}
            </h1>
          </div>
        </div>
        <div className={styles.accordionWrapper}>
          {docStatement && document?.sections.length !== 0
            ? document!.sections.map((d, index) => (
                <AccordionItem
                  key={index}
                  document={d}
                  docStatement={docStatement}
                  statement={docStatement}
                  isActiveSection={index === activeIndex}
                  setActiveIndex={setActiveIndex}
                  sectionIndex={index}
                />
              ))
            : null}
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
