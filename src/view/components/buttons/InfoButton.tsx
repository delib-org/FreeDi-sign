import InfoIcon from '../icons/InfoIcon';
import styles from './buttons.module.scss';

const InfoButton = () => {
  return (
    <button className={styles.infoButton}><InfoIcon/> Info</button>
  )
}

export default InfoButton