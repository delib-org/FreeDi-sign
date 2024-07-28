import { FC, useState } from "react";
import { setSectionToDB } from "../../../../controllers/db/statements/setStatements";
import { Statement } from "delib-npm";
import StrongMainButton from "../../../components/buttons/StrongMainButton";
import styles from "./NewSection.module.scss";
import { useSelector } from "react-redux";
import { isEditSelector } from "../../../../controllers/slices/editSlice";

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
  buttonValue = "Add new section",
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
    <StrongMainButton
      padding="8px 52px"
      backgroundColor="var(--active-btn)"
      color="#fff"
      value={buttonValue}
      width="14.05rem"
      height="2.41rem"
      fontSize="1rem"
      onClick={handleSubmitText}
    />
  );
};

export default NewSection;
