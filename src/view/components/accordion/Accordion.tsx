import React, { useState } from "react";
import styles from "./accordion.module.scss";
import AccordionItem from "./AccordionItem";
import ChevronLeft from "../icons/ChevronLeft";
import PdfDownloadLogo from "../icons/PdfDownloadLogo";
import { useParams } from "react-router-dom";
import { useDocument } from "../../../controllers/hooks/documentHooks";
import {
  DocumentObject,
  statementsToDocument,
} from "../../../controllers/general.ts/statement_helpers";
import File from "../icons/File";
import LogoAndName from "../icons/LogoAndName";

function Accordion1() {
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
            <LogoAndName />
            <p>for Nordia community</p>
          </div>
          <div className={styles.headerTitle}>
            <File />
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
        <PdfDownloadLogo />
        <h2 className={styles.pdfText}>Download PDF</h2>
      </div>
    </div>
  );
}

export default Accordion1;
