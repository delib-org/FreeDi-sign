import { Statement } from "delib-npm";
import { FC } from "react";
import Paragraph from "../paragraph/Paragraph";
import { setDocumentStatement } from "../../../../controllers/db/statements/setStatements";
interface Props {
  parentStatementId: string | undefined;
  statements: Statement[];
}

const Section: FC<Props> = ({ statements, parentStatementId }) => {
  try {
    if (!parentStatementId) throw new Error("Parent statement id is required");

    function handleSubmitText(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      try {
        const target = e.target as typeof e.target & {
          "new-statement": { value: string };
        };
        const newStatement = target["new-statement"].value;
        if (!parentStatementId) throw new Error("parentStatementId is required");
        if (newStatement) setDocumentStatement(newStatement, parentStatementId,statements.length);
      } catch (error) {
        console.error(error);
      }
    }

    return (
      <section>
        {statements.map((statement: Statement) => (
          <Paragraph key={statement.statementId} statement={statement} />
        ))}
        <form onSubmit={handleSubmitText}>
          <input type="text" name="new-statement" id="" />
          <button>OK</button>
        </form>
      </section>
    );
  } catch (error) {
    console.error(error);
    return <div>Error: An error occurred.</div>;
  }
};

export default Section;
