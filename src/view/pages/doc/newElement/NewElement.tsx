import { FC } from "react";
import { setSectionToDB } from "../../../../controllers/db/statements/setStatements";
import { useSelector } from "react-redux";
import { isEditSelector } from "../../../../controllers/slices/editSlice";
import { Statement } from "delib-npm";
import PlusIcon from "../../../../assets/icons/plus.svg?react";
import styles from "./NewElement.module.scss";

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
    <button onClick={handleSubmitText} className={styles.newElement}>
      <PlusIcon /> New Section {orderText}
      {orderText ? "." : null}
      {order + 1}
    </button>
  );
};

export default NewElement;
