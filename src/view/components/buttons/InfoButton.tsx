import Info from '../icons/Info';
import styles from './buttons.module.scss';

const InfoButton = () => {
  return (
    <button className={styles.infoButton}><Info/> Info</button>
  )
}

export default InfoButton