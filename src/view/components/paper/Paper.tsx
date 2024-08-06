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
import NewSection from "../../pages/doc/newSection/NewSection";




// toggle edit mode is inside the EditButton Component.
// the section edit is not working + its changing the main statement of the room name, making it invisible.
// the subsection edit is not working but we going to change and delete the sub section anyway.
// the paragraph section is working good.
// this is the main component where i connect everything.

const Paper = () => {
  const { statementId } = useParams<{ statementId: string }>();
  const { statements, isLoading, isError, docStatement, isAuthorized } =
    useDocument(statementId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: An error occurred.</div>;

  const document: DocumentObject | undefined = statementsToDocument({
    section: docStatement,
    statements,
    level: 1,
  });



  if (!isAuthorized) return <div>Not authorized</div>;

  const title = docStatement?.statement.split("\n")[0];

  return (
    <div className={styles.paper}>
      <PaperHeader title={title} />
      {docStatement &&  (
        <div className={styles.mainContainer}>
          {document &&
            document.sections.map((d) => (
              <Section
                key={d.statementId}
                document={d}
                docStatement={docStatement}
                statement={docStatement}
              />
            ))}
            <NewSection 
            docStatement={docStatement}
            order={document?.sections.length || 0}
            parentId={docStatement.statementId}
            isTop={true}  />
        </div>
      )}
      <PaperBottomButtons />
    </div>
  );
};

export default Paper;
