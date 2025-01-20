
import { Statement } from "delib-npm";
import { deleteSection } from "../../../controllers/db/sections/setSections";
import styles from "./inputs.module.scss";

import { FocusEvent, ChangeEvent, KeyboardEventHandler } from "react";
import { useDispatch } from "react-redux";
import { deleteStatement } from "../../../controllers/slices/statementsSlice";

type Props = {
  placeholder: string;
  text?: string;
  onChange?: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>
  ) => void;
  onKeyUp?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
  statement?: Statement;
};

const EditInput = ({ placeholder, text = "", onChange, onBlur, onKeyUp, statement }: Props) => {

  const dispatch = useDispatch();

  async function handleDelete() {
   const isDelete = await deleteSection(statement?.statementId);
    if(isDelete && statement){ 
      dispatch(deleteStatement(statement?.statementId));
    }

  }

  return (
    <div>
      {statement && <button onClick={handleDelete}>Delete</button>}
      <textarea
        autoFocus={true}
        defaultValue={text}
        placeholder={placeholder}
        className={styles.editInput}
        onChange={onChange}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
      />
    </div>

  );
};

export default EditInput;
