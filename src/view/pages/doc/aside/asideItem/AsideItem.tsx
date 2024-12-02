import styles from "./AsideItem.module.scss";
import { Statement } from "delib-npm";
import { useSelector } from "react-redux";
import { sectionsSelector } from "../../../../../controllers/slices/statementsSlice";
import { useLanguage } from "../../../../../controllers/hooks/useLanguage";
import { setViewToDB } from "../../../../../controllers/db/views/setViews";

interface Props {
  isActiveSection: boolean;
  setActiveIndex: (index: number | null) => void;
  sectionIndex: number;
  statement: Statement;
  level: number;
  isTOC?: boolean;
}

function AsideItem({
  isActiveSection,
  setActiveIndex,
  sectionIndex,
  statement,
  level,
  isTOC,
}: Props) {
  const { dir } = useLanguage();
  const sections = useSelector(sectionsSelector(statement.statementId));
  const title = statement.statement.split("\n")[0];

  function handleView() {
    setViewToDB(statement.statementId);
  }

  return (
    <>
      <div
        onClick={handleView}
        className={`${styles["asideItem"]} ${
          styles[isTOC ? "asideItem--toc" : ""]
        } ${dir === "rtl" && styles["asideItem--rtl"]}`}
      >
        <div className={styles.titleWrapper}>
          {isActiveSection ? (
            <a
              href={`#id-${statement.statementId}`}
              className={`${styles.active} ${styles.title} ${
                styles["h" + (level + 1)]
              }`}
            >
              {title}
            </a>
          ) : (
            <a
              href={`#id-${statement.statementId}`}
              className={`${styles.title} ${styles["h" + (level + 1)]}`}
            >
              {title}
            </a>
          )}
        </div>
        <div className={styles.descriptionWrapper}>
          {sections.map((section, index) => (
            <AsideItem
              isTOC={isTOC}
              key={`as-${section.statementId}`}
              statement={section}
              isActiveSection={index === sectionIndex}
              setActiveIndex={setActiveIndex}
              sectionIndex={index}
              level={level + 1}
            />
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

export default AsideItem;
