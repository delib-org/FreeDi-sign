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

  function handleAddNewParagraph() {
    const text = "New Paragraph";
    
    if (text) {
      setParagraphToDB({
        text,
        parentId,
        docStatement,
        order,
      });
    }
  }

  if (!isEditing) {
    return null;
  }

  return (
    <StrongMainButton
      backgroundColor="var(--cinnamon)"
      color="#fff"
      value="Add paragraph"
      onClick={handleAddNewParagraph}
    />
  );
};

export default NewParagraph;
