import { useParams } from "react-router-dom";
import Section from "../../pages/doc/section/Section";
import styles from "./paper.module.scss";
import { useDocument } from "../../../controllers/hooks/documentHooks";
import PaperBottomButtons from "./bottomButtons/PaperBottomButtons";
import NewSection from "../../pages/doc/newSection/NewSection";
import { useSelector } from "react-redux";
import { sectionsSelector } from "../../../controllers/slices/statementsSlice";
import { useLanguage } from "../../../controllers/hooks/useLanguage";

const Paper = () => {
  const { statementId } = useParams<{ statementId: string }>();
  const sections = useSelector(sectionsSelector(statementId || ""));
  const {dir} = useLanguage();

  const { isLoading, isError, statement, isAuthorized } =
    useDocument(statementId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: An error occurred.</div>;

  if (!isAuthorized) return <div>Not authorized</div>;

  return (
    <div className={styles.paper}>
      <div className={`wrapper wrapper--paper ${dir === "rtl" && "wrapper--rtl"}`}>
        {statement && (
          <div className={styles.mainContainer}>
            {sections.map((section, index) => (
              <Section
                key={section.statementId}
                statement={section}
                order={index + 1}
                parentLevel={0}
                parentBullet=""
              />
            ))}

            <NewSection
              statement={statement}
              order={sections.length + 1}
              parentBullet=""
            />
          </div>
        )}
        <PaperBottomButtons />
      </div>
    </div>
  );
};

export default Paper;
