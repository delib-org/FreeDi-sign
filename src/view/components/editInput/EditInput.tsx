import styles from "./inputs.module.scss";

import { FocusEvent, ChangeEvent, KeyboardEventHandler } from "react";

type Props = {
  placeHolder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>) => void;
  onKeyUp?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
};

const EditInput = ({ placeHolder, onChange, onBlur,onKeyUp}: Props) => {
 
    return (
      <textarea
      autoFocus={true}
        placeholder={placeHolder}
        className={styles.editInput}
        onChange={onChange}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
      />
    );
}


export default EditInput;
