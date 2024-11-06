import {FC} from 'react';
import styles from './Modal.module.scss';

interface Props{
    children?: React.ReactNode
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const Modal:FC<Props> = ({children, onClick}) => {
  return (
    <div className={styles.modal} onClick={onClick}>
        <div className={styles.box}>
        {children}
        </div>
    </div>
  )
}

export default Modal