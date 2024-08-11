import { FC, useEffect, useState } from "react";
import styles from "./Section.module.scss";
import { DocumentObject } from "../../../../controllers/general.ts/statement_helpers";
import NewParagraph from "../newParagraph/NewParagraph";
import { Statement } from "delib-npm";
import { useSelector } from "react-redux";
import { isEditSelector } from "../../../../controllers/slices/editSlice";
import NewElement from "../newElement/NewElement";
import SubParagraphs from "./subParagraphs/SubParagraphs";
import SubSections from "./subSections/SubSections";
import SectionTitle from "./sectionTitle/SectionTitle";

interface Props { 
  statement: Statement;
  document: DocumentObject;
  order: number ;
}

const Section: FC<Props> = ({ document, statement, order }) => {
  try {
    const isEdit = useSelector(isEditSelector);
    const [_isEdit, _setIsEdit] = useState(false);
    const [isTitleReady, setIsTitleReady] = useState(true);
    const { statementId } = statement;
    if (!statementId) throw new Error("statementId is required");

    useEffect(() => {
      if(document.title === "") {
        setIsTitleReady(false);
      }
    }, []);

    return (
      <section className={`${styles.section} ${isEdit ? styles.edit : null}`}>
        <SectionTitle
          order={order}
          document={document}
          setIsTitleReady={setIsTitleReady}
          isTitleReady={isTitleReady}
        />

        {isTitleReady && (
          <div className={styles.sectionsWrapper}>
            <div className={styles.paragraphs}>
              <SubParagraphs statement={statement} document={document} />
              {statement && (
                <NewParagraph
                  statement={statement}
                  parentId={statementId}
                  order={document.sections.length}
                />
              )}
            </div>
            <div className={styles.sections}>
              <SubSections
                document={document}
                statement={statement}
                parentOrder={order}
              />
            </div>
            <NewElement
              statement={statement}
              orderText={order}
              order={document.sections.length}
              parentId={statementId}
              level={document.level}
            />
          </div>
        )}
      </section>
    );
  } catch (error: any) {
    console.error(error);
    return <div>Error: An error occurred: {error.message}</div>;
  }
};

export default Section;

export function sectionHeader(title: string, level: number) {
  switch (level) {
    case 2:
      return <h2>{title}</h2>;
    case 3:
      return <h3>{title}</h3>;
    case 4:
      return <h4>{title}</h4>;
    case 5:
      return <h5>{title}</h5>;
    case 6:
      return <h6>{title}</h6>;
    default:
      return <h6>{title}</h6>;
  }
}
