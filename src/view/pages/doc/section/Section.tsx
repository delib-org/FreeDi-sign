import { FC, useState } from "react";
import styles from "./Section.module.scss";
import NewParagraph from "../newParagraph/NewParagraph";
import { Statement } from "delib-npm";
import { useSelector } from "react-redux";
import { isEditSelector } from "../../../../controllers/slices/editSlice";
import SubParagraphs from "./subParagraphs/SubParagraphs";
import SubSections from "./subSections/SubSections";
import SectionTitle from "./sectionTitle/SectionTitle";
import NewSection from "../newSection/NewSection";

interface Props {
  statement: Statement;
  order: number;
  parentLevel: number;
  parentBullet: string;
}

const Section: FC<Props> = ({
  statement,
  order,
  parentBullet,
  parentLevel,
}) => {
  try {
    const isEdit = useSelector(isEditSelector);
    const [_isEdit, _setIsEdit] = useState(false);
    const [isTitleReady, setIsTitleReady] = useState(true);
    const { statementId } = statement;
    if (!statementId) throw new Error("statementId is required");

    const bullet =
      parentBullet !== "" ? `${parentBullet}.${order}` : `${order}`;
    const level = parentLevel + 1;

    return (
      <section className={`${styles.section} ${isEdit ? styles.edit : null}`}>
        <SectionTitle
          bullet={bullet}
          level={level}
          statement={statement}
          setIsTitleReady={setIsTitleReady}
          isTitleReady={isTitleReady}
        />
        {isTitleReady && (
          <div className={styles.sectionsWrapper}>
            <div className={styles.paragraphs}>
              <SubParagraphs parentStatement={statement} />
              {statement && (
                <NewParagraph statement={statement} order={order} />
              )}
            </div>
            <div className={styles.sections}>
              <SubSections
                statement={statement}
                parentBullet={bullet}
                parentLevel={level}
              />
            </div>
            <NewSection statement={statement} order={3} />
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
