import { FC, useState } from "react";
import { setSectionToDB } from "../../../../controllers/db/statements/setStatements";
import { useSelector } from "react-redux";
import { isEditSelector } from "../../../../controllers/slices/editSlice";
import { Statement } from "delib-npm";


interface Props {
  docStatement: Statement;
  level: number;
  order: number;
  parentId: string;
  isTop?: boolean;
}

const NewElement: FC<Props> = ({
  docStatement,
  level,
  order,
  parentId,
  isTop = false  
}) => {
  const isEditing = useSelector(isEditSelector);

  

  function handleSubmitText() {
    if (!docStatement) throw new Error("parentStatementId is required");


    const text = "New Section";

    if (text)
      setSectionToDB({
        text,
        docStatement,
        parentId,
        order,
        isTop,
      });
  }
  if (!isEditing) return null;

  return (
    <div>
      <button onClick={handleSubmitText} className="new-section">
        {/* <PlusIcon /> */}
       + H{level}
      </button>
    </div>

  );
};

export default NewElement;
