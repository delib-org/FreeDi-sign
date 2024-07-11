import styles from './accordionItem.module.scss'
import ChevronDown from "../icons/ChevronDown";
import ChevronRight from "../icons/ChevronRight";

interface SectionProps {
  title: string;
  description: string;
}

interface Props {
  section: SectionProps;
  isActiveSection: boolean;
  setActiveIndex: (index: number | null) => void;
  sectionIndex: number;
}

function AccordionItem({
  section,
  isActiveSection,
  setActiveIndex,
  sectionIndex,
}: Props) {
  const toggleSection = () => {
    const nextIndex = isActiveSection ? null : sectionIndex;
    setActiveIndex(nextIndex);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper} onClick={toggleSection}>
        {isActiveSection ? <h2 className={`${styles.active} ${styles.title}`}>{section.title}</h2> : <h2 className={styles.title}>{section.title}</h2>}
        <span className={styles.titleSpan}>{isActiveSection ? <ChevronDown/> : <ChevronRight/>}</span>
      </div>
      {isActiveSection && <div className={styles.description}>{section.description} </div>}
    </div>
  );
}

export default AccordionItem;
