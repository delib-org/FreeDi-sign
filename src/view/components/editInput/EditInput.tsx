
import styles from "./inputs.module.scss";

import { FocusEvent, ChangeEvent, KeyboardEventHandler } from "react";

type Props = {
  placeholder: string;
  text?:string;
  onChange?: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>
  ) => void;
  onKeyUp?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
};

const EditInput = ({ placeholder, text= "", onChange, onBlur, onKeyUp }: Props) => {
  return (
    <textarea
      autoFocus={true}
      defaultValue={text}
      placeholder={placeholder}
      className={styles.editInput}
      onChange={onChange}
      onBlur={onBlur}
      onKeyUp={onKeyUp}
    />
  );
};

export default EditInput;
