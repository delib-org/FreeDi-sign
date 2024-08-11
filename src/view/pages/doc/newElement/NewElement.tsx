import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEditSelector } from "../../../../controllers/slices/editSlice";
import { Statement, DocumentType } from "delib-npm";
import PlusIcon from "../../../../assets/icons/plus.svg?react";
import styles from "./NewElement.module.scss";
import { createNewStatement } from "../../../../controllers/general.ts/statement_helpers";
import { setStatement } from "../../../../controllers/slices/statementsSlice";

interface Props {
  statement: Statement;
  level: number;
  order: number;
  orderText: number | string;
  parentId: string;
  isTop?: boolean;
}

const NewElement: FC<Props> = ({
  statement,
  order,
  orderText,
  parentId,
  isTop = false,
}) => {
  const dispatch = useDispatch();
  const isEditing = useSelector(isEditSelector);

  function handleSubmitText() {
    try {
      if (!statement) throw new Error("parentStatementId is required");

      const text = "";

      const newSection = createNewStatement({
        text,
        statement,
        parentId,
        order,
        isTop,
        type: DocumentType.section, // Replace "someType" with the actual type value
      });
      if(!newSection) throw new Error("Error creating new section");
      
      dispatch(setStatement(newSection));

    } catch (error) {
      console.error(error);
    }
  }
  if (!isEditing) return null;

  return (
    <button onClick={handleSubmitText} className={styles.newElement}>
      <PlusIcon /> New Section {orderText}
      {orderText ? "." : null}
      {order + 1}
    </button>
  );
};

export default NewElement;
