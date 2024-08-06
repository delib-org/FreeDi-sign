import { FC } from "react";
import { setParagraphToDB } from "../../../../controllers/db/statements/setStatements";
import { Statement } from "delib-npm";
import StrongMainButton from "../../../components/buttons/StrongMainButton";
import { useSelector } from "react-redux";
import { isEditSelector } from "../../../../controllers/slices/editSlice";
interface Props {
  docStatement: Statement;
  parentId: string;
  order: number;
}
const NewParagraph: FC<Props> = ({ docStatement, parentId, order }) => {
  const isEditing = useSelector(isEditSelector);

  function handleAddNewParagraph(ev:any) {
    if (ev.key !== "Enter") return;
    const text = ev.target.value;
    
    if (text) {
      setParagraphToDB({
        text,
        parentId,
        docStatement,
        order,
      });
      ev.target.value = "";
    }
  }

  if (!isEditing) {
    return null;
  }

  return (
    <input type="text" placeholder="New Paragraph" onKeyUp={handleAddNewParagraph} />
  );
};

export default NewParagraph;
