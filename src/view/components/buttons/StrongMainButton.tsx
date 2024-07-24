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
    type?: "button" | "submit" | "reset";
}

const StrongMainButton = ({value,backgroundcolor, icon, padding, color, gap, width, height, fontSize, onClick, type = "button"}: Props) => {
  return (
    <>
    {icon ? 
    <button type={type} onClick={onClick} style={{backgroundColor:`${backgroundcolor}`, padding:`${padding}`, color:`${color}`, gap:`${gap}`, width:`${width}`, height:`${height}` , fontSize:`${fontSize}`}} className={`${styles.strongButton} ${styles.buttonWithIcon}`}>{value}<span>{icon}</span></button>
    : <button type={type} onClick={onClick} style={{backgroundColor:`${backgroundcolor}`, padding:`${padding}`, color:`${color}`, gap:`${gap}`, width:`${width}`, height:`${height}` , fontSize:`${fontSize}`}} className={styles.strongButton}>{value}</button>}
  </>
  )
}

export default StrongMainButton