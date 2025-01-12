import { FC, useEffect, useState } from "react";
import styles from "./Section.module.scss";
import NewParagraph from "../newParagraph/NewParagraph";
import { Statement } from "delib-npm";
import { useSelector } from "react-redux";
import { isEditSelector } from "../../../../controllers/slices/editSlice";
import SubParagraphs from "./subParagraphs/SubParagraphs";
import SubSections from "./subSections/SubSections";
import SectionTitle from "./sectionTitle/SectionTitle";
import NewSection from "../newSection/NewSection";
import {
  getBullet,
  getViewWidth,
} from "../../../../controllers/general.ts/helpers";
import { useLanguage } from "../../../../controllers/hooks/useLanguage";

//icons
import ArrowUpIcon from "../../../../assets/icons/arrowUp.svg?react";
import { TOC_WIDTH } from "../../../../model/toc";

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
  const isEdit = useSelector(isEditSelector);
  const [isTitleReady, setIsTitleReady] = useState(true);
  const [subSectionsLength, setSubSectionsLength] = useState<number>(0);
  const [isTOC, setIsTOC] = useState<boolean>(getViewWidth() < TOC_WIDTH);
  const { statementId } = statement;
  if (!statementId) throw new Error("statementId is required");
  const { dir, t } = useLanguage();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsTOC(getViewWidth() < TOC_WIDTH);
    });
  }, []);

  try {
    const bullet = getBullet(parentBullet, order);
    const level = parentLevel + 1;

    return (
      <section
        className={`${styles.section} ${dir === "rtl" && styles["section--rtl"]
          } ${isEdit && styles.edit}`}
      >
        <SectionTitle
          bullet={bullet}
          level={level}
          statement={statement}
          setIsTitleReady={setIsTitleReady}
          isTitleReady={isTitleReady}
        />
        {isTitleReady && (
          <div
            className={`${styles.sectionsWrapper} ${dir === "rtl" && styles["sectionsWrapper--rtl"]
              }`}
          >
            <div className={styles.paragraphs}>
              <SubParagraphs parentStatement={statement} />
              {statement && (
                <NewParagraph statement={statement} order={order} />
              )}
            </div>
            {isTOC && (
              <a href="#toc" className={styles.back}>
                {t("Back to table of contents")}
                <div style={{ transform: dir === "ltr" ? `scaleX(1)` : `scaleX(-1)` }}>
                  <ArrowUpIcon />
                </div>
              </a>
            )}
            <div className={styles.sections}>
              <SubSections
                setSubSectionsLength={setSubSectionsLength}
                statement={statement}
                parentBullet={bullet}
                parentLevel={level}
              />
            </div>
            <NewSection
              statement={statement}
              order={subSectionsLength + 1}
              parentBullet={bullet}
            />
          </div>
        )}
      </section>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default Section;
