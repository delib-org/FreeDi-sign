import { Statement } from "delib-npm";
import styles from "./inputs.module.scss";

import { FocusEvent, ChangeEvent, KeyboardEventHandler } from "react";

type Props = {
  placeholder: string;
  statement:Statement;
  onChange?: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>
  ) => void;
  onKeyUp?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
};

const EditInput = ({ placeholder, statement, onChange, onBlur, onKeyUp }: Props) => {
  return (
    <textarea
      autoFocus={true}
      defaultValue={statement.statement || ""}
      placeholder={placeholder}
      className={styles.editInput}
      onChange={onChange}
      onBlur={onBlur}
      onKeyUp={onKeyUp}
    />
  );
};

export default EditInput;
