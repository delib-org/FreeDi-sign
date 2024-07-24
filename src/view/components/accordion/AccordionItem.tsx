import styles from "./accordionItem.module.scss";
import ChevronDown from "../icons/ChevronDown";
import ChevronRight from "../icons/ChevronRight";
import { Statement } from "delib-npm";
import { DocumentObject } from "../../../controllers/general.ts/statement_helpers";

interface Props {
  isActiveSection: boolean;
  setActiveIndex: (index: number | null) => void;
  sectionIndex: number;
  docStatement: Statement;
  statement: Statement;
  document: DocumentObject;
}

function AccordionItem({
  isActiveSection,
  setActiveIndex,
  sectionIndex,
  docStatement,
  statement,
  document,
}: Props) {
  const toggleSection = () => {
    const nextIndex = isActiveSection ? null : sectionIndex;
    setActiveIndex(nextIndex);
  };

  if (!docStatement) throw new Error("Parent statement id is required");
  const { statementId } = document;
  if (!statementId) throw new Error("statementId is required");

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper} onClick={toggleSection}>
          {isActiveSection ? (
            <h2 className={`${styles.active} ${styles.title}`}>
              {document.title}
            </h2>
          ) : (
            <h2 className={styles.title}>{document.title}</h2>
          )}
          <span className={styles.titleSpan}>
            {isActiveSection ? <ChevronDown /> : <ChevronRight />}
          </span>
        </div>
        <div className={styles.descriptionWrapper}>
          {isActiveSection &&
            document.sections.map((section, index) => (
              <div className={styles.description} key={index}>
                {section.title}
              </div>
            ))}
        </div>
      </div>
    </>
    // <div className={styles.wrapper}>
    //   <div className={styles.titleWrapper} onClick={toggleSection}>

    //     {isActiveSection ? <h2 className={`${styles.active} ${styles.title}`}>h1</h2> : <h2 className={styles.title}>h1</h2>}
    //     <span className={styles.titleSpan}>{isActiveSection ? <ChevronDown/> : <ChevronRight/>}</span>
    //   </div>
    //   {isActiveSection && <div className={styles.description}>h2 </div>}
    // </div>
  );
}

export default AccordionItem;
