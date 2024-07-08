import { useParams } from "react-router-dom";
import { useDocument } from "../../../controllers/hooks/documentHooks";
import Section from "./section/Section";
import NewStatement from "./newStatement/NewStatement";
import { Statement } from "delib-npm";

const Document = () => {
  const { statementId } = useParams<{ statementId: string }>();
  const { statements, isLoading, isError } = useDocument(statementId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: An error occurred.</div>;
  
 const _statements = getTopSections(statements);
  return (
    <div>
      <h1>Document: {statementId}</h1>
      {_statements.map((statement) => (
        <Section key={statement.statementId} statements={statements} parentStatementId={statementId} />
      ))}
      <NewStatement parentStatementId={statementId} statements={statements} sectionId={undefined} parentSectionId="top" />
    </div>
  );
};

export default Document;

interface Sections{
    [key:string]:Statement[]
    
}

function getTopSections(statements: Statement[]):Statement[] {
    const topSections = statements.filter((statement) => statement.documentSettings?.parentSectionId === "top");
    return topSections;
}
