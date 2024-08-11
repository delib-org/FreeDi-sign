import { useParams } from "react-router-dom";
import Section from "../../pages/doc/section/Section";
import styles from "./paper.module.scss";
import { useDocument } from "../../../controllers/hooks/documentHooks";
import {
  DocumentObject,
  statementsToDocument,
} from "../../../controllers/general.ts/statement_helpers";
import PaperHeader from "./header/PaperHeader";
import PaperBottomButtons from "./bottomButtons/PaperBottomButtons";
import NewElement from "../../pages/doc/newElement/NewElement";

// toggle edit mode is inside the EditButton Component.
// the section edit is not working + its changing the main statement of the room name, making it invisible.
// the subsection edit is not working but we going to change and delete the sub section anyway.
// the paragraph section is working good.
// this is the main component where i connect everything.

const Paper = () => {
  const { statementId } = useParams<{ statementId: string }>();
  const { statements, isLoading, isError, statement, isAuthorized } =
    useDocument(statementId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: An error occurred.</div>;

  const document: DocumentObject | undefined = statementsToDocument({
    section: statement,
    statements,
    level: 2,
  });

  if (!isAuthorized) return <div>Not authorized</div>;

  const title = statement?.statement.split("\n")[0];

  return (
    <div className={styles.paper}>
      <PaperHeader title={title} />
      {statement && (
        <div className={styles.mainContainer}>
          {document &&
            document.sections.map((d, index) => (
              <Section
                key={d.statementId}
                document={d}
                statement={statement}
                order={index + 1}
              />
            ))}
          {/* <NewSection 
            statement={statement}
            order={document?.sections.length || 0}
            parentId={statement.statementId}
            isTop={true}  /> */}
          <NewElement
          orderText={`${document?.sections.length}`}
            statement={statement}
            order={document?.sections.length || 0}
            parentId={statement.statementId}
            isTop={true}
            level={2}
          />
        </div>
      )}
      <PaperBottomButtons />
    </div>
  );
};

export default Paper;
