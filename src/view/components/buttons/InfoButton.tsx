import {FC} from 'react';
import InfoIcon from '../icons/InfoIcon';
import styles from './buttons.module.scss';

interface Props {
  onClick?: () => void
}
const InfoButton:FC<Props> = ({onClick}) => {
  return (
    <button className={styles.infoButton} onClick={onClick}><InfoIcon/> Info</button>
  )
}

export default InfoButton