import { FC } from "react";
import { setSectionToDB } from "../../../../controllers/db/statements/setStatements";

interface Props {
  parentDocumentId: string ;
  order: number;
  parentId: string;
  isTop?: boolean;
}

const NewSection: FC<Props> = ({
  parentDocumentId,
  order,
  parentId,
  isTop =false
}) => {
  function handleSubmitText(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const target = e.target as typeof e.target & {
        "new-statement": { value: string };
      };
      const text = target["new-statement"].value;

      if (!parentDocumentId) throw new Error("parentStatementId is required");

      if (text)
        setSectionToDB({
          text,
          parentDocumentId,
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
