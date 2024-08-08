import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEditSelector } from "../../../../controllers/slices/editSlice";
import { Statement, DocumentType } from "delib-npm";
import PlusIcon from "../../../../assets/icons/plus.svg?react";
import styles from "./NewElement.module.scss";
import { setSectionToDB } from "../../../../controllers/db/sections/setSections";
import { createNewStatement } from "../../../../controllers/general.ts/statement_helpers";
import { setStatement } from "../../../../controllers/slices/statementsSlice";

interface Props {
  docStatement: Statement;
  level: number;
  order: number;
  orderText: number | string;
  parentId: string;
  isTop?: boolean;
}

const NewElement: FC<Props> = ({
  docStatement,
  order,
  orderText,
  parentId,
  isTop = false,
}) => {
  const dispatch = useDispatch();
  const isEditing = useSelector(isEditSelector);

  function handleSubmitText() {
    try {
      if (!docStatement) throw new Error("parentStatementId is required");

      const text = "";

      const newSection = createNewStatement({
        text,
        docStatement,
        parentId,
        order,
        isTop,
        type: DocumentType.section, // Replace "someType" with the actual type value
      });
      if(!newSection) throw new Error("Error creating new section");
      
      dispatch(setStatement(newSection));

      // if (text)
      //   setSectionToDB({
      //     text,
      //     docStatement,
      //     parentId,
      //     order,
      //     isTop,
      //   });
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
