import { useParams } from "react-router-dom";
import { useDocument } from "../../../controllers/hooks/documentHooks";
import Section from "./section/Section";
import {
  DocumentObject,
  statementsToDocument,
} from "../../../controllers/general.ts/statement_helpers";
import NewSection from "./newSection/NewSection";
import { useDispatch, useSelector } from "react-redux";
import { isEditSelector, toggleIsEdit } from "../../../controllers/slices/editSlice";


const Document = () => {
const dispatch = useDispatch();
  const isEdit = useSelector(isEditSelector);
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

      <button style={{backgroundColor:isEdit?"red":"green"}} onClick={()=>{dispatch(toggleIsEdit())}}>{isEdit?"stop edit":"start edit"}</button>

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
