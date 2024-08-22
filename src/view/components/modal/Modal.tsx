import {FC} from 'react';
import styles from './Modal.module.scss';

interface Props{
    children?: React.ReactNode
}

const Modal:FC<Props> = ({children}) => {
  return (
    <div className={styles.modal}>
        <div className={styles.box}>
        {children}
        </div>
    </div>
  )
}

export default Modal