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
}

function AsideItem({
  isActiveSection,
  setActiveIndex,
  sectionIndex,
  statement,
}: Props) {
  const toggleSection = () => {
    const nextIndex = isActiveSection ? null : sectionIndex;
    setActiveIndex(nextIndex);
  };

  const sections = useSelector(sectionsSelector(statement.statementId));
  const title = statement.statement.split("\n")[0];

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper} onClick={toggleSection}>
          {isActiveSection ? (
            <h2 className={`${styles.active} ${styles.title}`}>{title}</h2>
          ) : (
            <h2 className={styles.title}>{title}</h2>
          )}
          <span className={styles.titleSpan}>
            {isActiveSection ? <ChevronDownIcon /> : <ChevronRightIcon />}
          </span>
        </div>
        <div className={styles.descriptionWrapper}>
          {isActiveSection &&
            sections.map((section, index) => {
              const sectionTitle = section.statement.split("\n")[0];
              return(
              <div className={styles.description} key={index}>
                {sectionTitle}
              </div>
            )})}
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
