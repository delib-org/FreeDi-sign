import { FC } from "react";
import { setSectionToDB } from "../../../../controllers/db/sections/setSections";
import { useSelector } from "react-redux";
import { isEditSelector } from "../../../../controllers/slices/editSlice";
import { Statement } from "delib-npm";

import PlusIcon from "../../../../assets/icons/plus.svg?react";

interface Props {
  docStatement: Statement;
  order: number;
  parentId: string;
  buttonValue?: string;
  isTop?: boolean;
}

const NewSection: FC<Props> = ({
  docStatement,
  order,
  parentId,
  isTop = false,
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
        <PlusIcon />
       
      </button>
    </div>

  );
};

export default NewSection;
