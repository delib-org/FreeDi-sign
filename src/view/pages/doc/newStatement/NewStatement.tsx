import {FC} from 'react'
import { setDocumentStatement } from '../../../../controllers/db/statements/setStatements';

interface Props {
    parentStatementId: string | undefined;
  
    sectionId: string|undefined;
    parentSectionId: string|undefined;
}

const NewStatement:FC<Props>= ({parentStatementId, sectionId,parentSectionId = "top"}) => {
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
            order: 1,
            sectionId,
            parentSectionId,
          });
        (e.target as HTMLFormElement).reset();
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