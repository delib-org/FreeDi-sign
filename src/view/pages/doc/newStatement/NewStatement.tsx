import {FC} from 'react'
import { setDocumentStatement } from '../../../../controllers/db/statements/setStatements';
import { Statement } from 'delib-npm';

interface Props {
    parentStatementId: string | undefined;
    statements: Statement[];
    sectionId: string|undefined;
    parentSectionId: string|undefined;
}

const NewStatement:FC<Props>= ({parentStatementId, statements, sectionId,parentSectionId}) => {
    function handleSubmitText(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
          const target = e.target as typeof e.target & {
            "new-statement": { value: string };
          };
          const newStatement = target["new-statement"].value;
          if (!parentStatementId)
            throw new Error("parentStatementId is required");
          if (newStatement)
            setDocumentStatement({
              statement: newStatement,
              statementId: parentStatementId,
              order: statements.length,
              sectionId,
              parentSectionId,
            });
        } catch (error) {
          console.error(error);
        }
      }
  return (
    <form onSubmit={handleSubmitText}>
          <input type="text" name="new-statement" id="" />
          <button>OK</button>
        </form>
  )
}

export default NewStatement