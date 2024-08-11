import { FC, useEffect, useState } from "react";
import styles from "./Section.module.scss";
import { DocumentObject } from "../../../../controllers/general.ts/statement_helpers";
import NewParagraph from "../newParagraph/NewParagraph";
import { Statement } from "delib-npm";
import { useSelector } from "react-redux";
import { isEditSelector } from "../../../../controllers/slices/editSlice";
import NewElement from "../newSection/NewSection";
import SubParagraphs from "./subParagraphs/SubParagraphs";
import SubSections from "./subSections/SubSections";
import SectionTitle from "./sectionTitle/SectionTitle";
import {
  paragraphsSelector,
  sectionsSelector,
} from "../../../../controllers/slices/statementsSlice";
import NewSection from "../newSection/NewSection";

interface Props {
  statement: Statement;
  order: number;
}

const Section: FC<Props> = ({ statement, order }) => {
  try {

    const isEdit = useSelector(isEditSelector);
    const [_isEdit, _setIsEdit] = useState(false);
    const [isTitleReady, setIsTitleReady] = useState(true);
    const { statementId } = statement;
    if (!statementId) throw new Error("statementId is required");
   

    return (
      <section className={`${styles.section} ${isEdit ? styles.edit : null}`}>
        <SectionTitle
          order={order}
          statement={statement}
          setIsTitleReady={setIsTitleReady}
          isTitleReady={isTitleReady}
        />
        {isTitleReady && (
          <div className={styles.sectionsWrapper}>
            <div className={styles.paragraphs}>
              <SubParagraphs parentStatement={statement} />
              {statement && (
                <NewParagraph
                  statement={statement}
                  order={2}
                />
              )}
            </div>
            <div className={styles.sections}>
              <SubSections statement={statement} />
            </div>
            <NewSection
              statement={statement}
              order={3}            
            />
          </div>
        )}
      </section>
    );
  } catch (error: any) {
    console.error(error);
    return null;
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
