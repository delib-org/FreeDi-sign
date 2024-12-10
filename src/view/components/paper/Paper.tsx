import { useParams } from "react-router-dom";
import Section from "../../pages/doc/section/Section";
import styles from "./paper.module.scss";
import { useDocument } from "../../../controllers/hooks/documentHooks";
import AdminBottomButtons from "./bottomButtons/AdminBottomButtons";
import NewSection from "../../pages/doc/newSection/NewSection";
import { useSelector } from "react-redux";
import {
  documentParagraphsSelector,
  sectionsSelector,
} from "../../../controllers/slices/statementsSlice";
import { useLanguage } from "../../../controllers/hooks/useLanguage";
import { Role } from "delib-npm";
import UserButtons from "./bottomButtons/userButtons/UserButtons";
import { selectApprovalsByDocId } from "../../../controllers/slices/approvalSlice";
import Text from "../text/Text";
import HourGlassLoader from "../loaders/HourGlassLoader";
import TOC from "../../pages/doc/toc/TOC";
import { useState } from "react";
import { getViewWidth } from "../../../controllers/general.ts/helpers";

const Paper = () => {
  const { statementId } = useParams<{ statementId: string }>();
  const sections = useSelector(sectionsSelector(statementId || ""));
  const paragraphs = useSelector(documentParagraphsSelector(statementId || ""));
  const rejected = useSelector(
    selectApprovalsByDocId(statementId || "")
  ).filter((approval) => approval.approval === false);
  const approved = paragraphs.length - rejected.length;
  const { dir } = useLanguage();

  const [isAside, setIsAside] = useState<boolean>(getViewWidth()>1024);

  const { isLoading, isError, statement, role } = useDocument();
  if (isLoading) return <HourGlassLoader />;
  if (isError) return <div>Error: An error occurred.</div>;

  if (!statement) return null;

  //onresize
  window.addEventListener("resize", () => {
    //view width
    setIsAside(getViewWidth()>1024);
  });

  return (
    <div className={styles.paper}>
      <div
        className={`wrapper wrapper--paper ${dir === "rtl" && "wrapper--rtl"}`}
      >
         <div id="toc" />
        {statement && (
          <div className={styles.mainContainer}>
            <h1>{statement.statement}</h1>
           
            <Text
              statement={statement}
              showTitle={false}
              showDescription={true}
            />
           
            <div className={styles.TOC} >
             <TOC isAside={isAside} />
            </div>
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
      </div>
      {role === Role.admin ? (
        <AdminBottomButtons />
      ) : (
        <UserButtons
          paragraphsLength={paragraphs.length}
          approved={approved}
          document={statement}
        />
      )}
    </div>
  );
};

export default Paper;
