import { useParams } from "react-router-dom";
import { useDocument } from "../../../controllers/hooks/documentHooks";
import Section from "./section/Section";
import {
  DocumentObject,
  statementsToDocument,
} from "../../../controllers/general.ts/statement_helpers";
import NewSection from "./newSection/NewSection";
import { auth } from "../../../controllers/db/authCont";

const Document = () => {
  const { statementId } = useParams<{ statementId: string }>();
  const { statements, isLoading, isError, docStatement, isAuthorized } =
    useDocument(statementId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: An error occurred.</div>;
  
  const document: DocumentObject|undefined = statementsToDocument({
    section: docStatement,
    statements
  });
  
  if(!isAuthorized) return <div>Not authorized</div>;

  return (
    <div>
      <a href="https://freedi.tech">Freedi</a>
      <h1>Document: {docStatement?.statement}</h1>
      {docStatement && (
        <>
          {document && document.sections.map((d) => (
            <Section
              key={d.statementId}
              document={d}
              docStatement={docStatement}
              statement={docStatement}
            />
          ))}
          {document && <NewSection
            docStatement={docStatement}
            isTop={true}
            parentId={docStatement.statementId}
            order={document.sections.length}
          />}
        </>
      )}
    </div>
  );
};

export default Document;
