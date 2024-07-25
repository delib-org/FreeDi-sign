import styles from './inputs.module.scss';
import { ChangeEvent } from 'react';

type Props = {
    placeHolder: string,
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
}

const EditInput = ({placeHolder,onChange,onBlur}: Props) => {
  return (
    <textarea
      placeholder={placeHolder}
      className={styles.editInput}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}

export default EditInput