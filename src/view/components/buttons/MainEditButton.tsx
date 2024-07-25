import { useDispatch } from 'react-redux';
import EditTextIcon from '../icons/EditTextIcon';
import styles from './buttons.module.scss';
import { toggleIsEdit } from '../../../controllers/slices/editSlice';

interface Props {
    title: string;
}

const MainEditButton = ({ title }: Props) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleIsEdit());
  };

  return (
    <button className={styles.editButton} onClick={handleClick}>
      <EditTextIcon />{title}
    </button>
  );
}

export default MainEditButton