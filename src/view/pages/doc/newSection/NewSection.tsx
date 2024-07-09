import { FC } from "react";
import { setSectionToDB } from "../../../../controllers/db/statements/setStatements";
import { Statement } from "delib-npm";

interface Props {
  docStatement: Statement ;
  order: number;
  parentId: string;
  isTop?: boolean;
}

const NewSection: FC<Props> = ({
  docStatement,
  order,
  parentId,
  isTop =false
}) => {
  function handleSubmitText(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!docStatement) throw new Error("parentStatementId is required");

    try {
      const target = e.target as typeof e.target & {
        "new-statement": { value: string };
      };
      const text = target["new-statement"].value;

     

      if (text)
        setSectionToDB({
          text,
          docStatement,
          parentId,
          order,
          isTop,
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
  );
};

export default NewSection;
