import React, { useState } from "react";
import styles from "./accordion.module.scss";
import AccordionItem from "./AccordionItem";
import ChevronLeft from "../icons/ChevronLeft";
import PdfDownloadLogo from "../icons/PdfDownloadLogo";

function Accordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const data = [
    {
      title: "Section ipsum dolor sit amet consectetur.",
      description: "lorem ipsum ipsum lorem",
    },
    {
      title: "Section ipsum dolor sit amet consectetur.",
      description: "lorem ipsum ipsum lorem",
    },
    {
      title: "Section ipsum dolor sit amet consectetur.",
      description: "lorem ipsum ipsum lorem",
    },
    {
      title: "Section ipsum dolor sit amet consectetur.",
      description: "lorem ipsum ipsum lorem",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.headerWrapper}>
          <ChevronLeft />
          <h1 className={styles.header}>
            Lorem ipsum dolor sit amet consectetur
          </h1>
        </div>
        <div className={styles.accordionWrapper}>
          {data.map((section, index) => {
            return (
              <AccordionItem
                section={section}
                isActiveSection={index === activeIndex}
                key={index}
                setActiveIndex={setActiveIndex}
                sectionIndex={index}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.pdfWrapper}>
        <PdfDownloadLogo />
        <h2 className={styles.pdfText}>Download PDF</h2>
      </div>
    </div>
  );
}

export default Accordion;
