import { ReactNode } from 'react';
import styles from './buttons.module.scss';

interface Props {
    value: string,
    backgroundcolor:string,
    padding: string,
    width: string,
    height:string,
    fontSize: string,
    icon?: ReactNode,
    color?:string,
    gap?: string,
    onClick?: () => void;
}

const MainButton = ({value,backgroundcolor, icon, padding, color, gap, width, height, fontSize, onClick}: Props) => {
  return (
    <>
    {icon ? 
    <button onClick={onClick} style={{backgroundColor:`${backgroundcolor}`, padding:`${padding}`, color:`${color}`, gap:`${gap}`, width:`${width}`, height:`${height}` , fontSize:`${fontSize}`}} className={`${styles.button} ${styles.buttonWithIcon}`}>{value}<span>{icon}</span></button>
    : <button onClick={onClick} style={{backgroundColor:`${backgroundcolor}`, padding:`${padding}`, color:`${color}`, gap:`${gap}`, width:`${width}`, height:`${height}` , fontSize:`${fontSize}`}} className={styles.button}>{value}</button>}
  </>
  )
}

export default MainButton