import EditText from '../icons/EditText';
import styles from './buttons.module.scss';

interface Props{
    title:string
}

const EditButton = ({title}:Props) => {
  return (
    <button className={styles.editButton}><EditText/>{title}</button>
  )
}

export default EditButton