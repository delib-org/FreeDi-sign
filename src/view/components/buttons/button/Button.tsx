import {FC, MouseEventHandler} from 'react'
import styles from './Button.module.scss'

interface Props {
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    backgroundColor?: string;
    color?: string;
    borderRadius?: string;
    children?: React.ReactNode;
    }

const Button:FC<Props> = ({text, onClick, backgroundColor="teal", color="white", borderRadius="50px", children}) => {
  return (
    <button className={styles.button} onClick={onClick} style={{backgroundColor, color, borderRadius}}><span>{text}</span> {children}</button>
  )
}

export default Button