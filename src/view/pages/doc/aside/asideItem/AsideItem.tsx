import styles from "./AsideItem.module.scss";
import ChevronDownIcon from "../../../../components/icons/ChevronDownIcon";
import ChevronRightIcon from "../../../../components/icons/ChevronRightIcon";
import { Statement } from "delib-npm";
import { useSelector } from "react-redux";
import { sectionsSelector } from "../../../../../controllers/slices/statementsSlice";

interface Props {
  isActiveSection: boolean;
  setActiveIndex: (index: number | null) => void;
  sectionIndex: number;
  statement: Statement;
  level: number;
}

function AsideItem({
  isActiveSection,
  setActiveIndex,
  sectionIndex,
  statement,
  level
}: Props) {
  const toggleSection = () => {
    const nextIndex = isActiveSection ? null : sectionIndex;
    setActiveIndex(nextIndex);
  };

  const sections = useSelector(sectionsSelector(statement.statementId));
  const title = statement.statement.split("\n")[0];

  return (
    <>
      <div className={styles.asideItem}>
        <div className={styles.titleWrapper} onClick={toggleSection}>
          {isActiveSection ? (
            <a href={`#id-${statement.statementId}`}  className={`${styles.active} ${styles.title} ${styles["h"+(level+1)]}`}>{title}</a>
          ) : (
            <a href={`#id-${statement.statementId}`}  className={`${styles.title} ${styles["h"+(level+1)]}`}>{title}</a>
          )}
          
        </div>
        <div className={styles.descriptionWrapper}>
          {sections.map((section, index) => (
            <AsideItem
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
