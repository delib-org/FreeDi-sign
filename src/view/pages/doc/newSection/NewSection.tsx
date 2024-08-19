import { FC, useState } from "react";
import {  useSelector } from "react-redux";
import { isEditSelector } from "../../../../controllers/slices/editSlice";
import { Statement, DocumentType } from "delib-npm";
import PlusIcon from "../../../../assets/icons/plus.svg?react";
import styles from "./NewSection.module.scss";
import { createNewStatement } from "../../../../controllers/general.ts/statement_helpers";

import EditInput from "../../../components/editInput/EditInput";
import { setSectionToDB } from "../../../../controllers/db/sections/setSections";
import { getBullet } from "../../../../controllers/general.ts/helpers";

interface Props {
  statement: Statement;
  parentBullet: string;
  order: number;
}

const NewSection: FC<Props> = ({ statement, order,parentBullet }) => {

  const isEditing = useSelector(isEditSelector);
  const bullet = getBullet(parentBullet, order);

  const [isEdit, setIsEdit] = useState(false);

  function handleSubmitText(e: any) {
    try {
      if (!statement) throw new Error("parentStatementId is required");
      if (e.key === "Enter" || e.type === "blur") {
    
        const text = e.target.value.replace(/\n/g, "");
              
        if (!text || text === "") return;

        const newSection = createNewStatement({
          text,
          statement,
          order,
          type: DocumentType.section, // Replace "someType" with the actual type value
        });

        if (!newSection) throw new Error("Error creating new section");

        setIsEdit(false);
        setSectionToDB(newSection);
      }
    } catch (error) {
      console.error(error);
    }
  }
  if (!isEditing) return null;

  if (isEdit) {
    return (
      <EditInput
        placeholder="New Section"
        onChange={handleSubmitText}
        onBlur={handleSubmitText}
        onKeyUp={handleSubmitText}
      />
    );
  }

  return (
    <button onClick={() => setIsEdit(true)} className={styles.newElement}>
      <PlusIcon /> New Section
      {bullet}
    </button>
  );
};

export default NewSection;
