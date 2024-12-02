import { useState } from 'react'

import styles from './TOC.module.scss'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sectionsSelector } from '../../../../controllers/slices/statementsSlice';
import { useLanguage } from '../../../../controllers/hooks/useLanguage';
import AsideItem from '../aside/asideItem/AsideItem';

interface Props{
    isAside?: boolean
}

function TableOfContent({isAside}: Props) {
    const {statementId} = useParams();
    const {dir, t} = useLanguage();
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const sections = useSelector(sectionsSelector(statementId));

  return (
    <div
    className={`${styles.content} ${
      dir === "rtl" ? styles["content--rtl"] : null
    }`}
  >
    <div className={styles.title}>
      <div className={styles.contentTitle}>{t("Content")}</div>
    </div>
    {sections.map((st, index) => (
      <AsideItem
        isTOC={isAside? false : true}
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
  )
}

export default TableOfContent