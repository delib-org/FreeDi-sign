import { useDispatch, useSelector } from 'react-redux';
import EditIcon from "../../../../assets/icons/edit.svg?react";
import styles from './MainEditButton.module.scss';
import { isEditSelector, toggleIsEdit } from '../../../../controllers/slices/editSlice';

interface Props {
    title: string;
}

const MainEditButton = ({ title }: Props) => {
  const dispatch = useDispatch();
  const isEdit = useSelector(isEditSelector);

  const handleClick = () => {
    dispatch(toggleIsEdit());
  };

  return (
    <button className={`${styles.editButton} ${isEdit?styles.edit:styles.nonEdit}`} onClick={handleClick}>
      <EditIcon />{title}
    </button>
  );
}

export default MainEditButton