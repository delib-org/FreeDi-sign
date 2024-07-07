import { useParams } from "react-router-dom";
import { useDocument } from "../../../controllers/hooks/documentHooks";
import Section from "./section/Section";

const Document = () => {
  const { statementId } = useParams<{ statementId: string }>();
  const { statements, isLoading, isError } = useDocument(statementId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: An error occurred.</div>;
  
 
  return (
    <div>
      <h1>Document: {statementId}</h1>
      {statements.map((statement) => (
        <Section key={statement.statementId} statements={[statement]} parentStatementId={statementId} />
      ))}
      
    </div>
  );
};

export default Document;
