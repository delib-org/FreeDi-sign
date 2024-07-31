import AddComment from '../../../assets/icons/addCommentIcon.svg?react';
import styles from './buttons.module.scss';

type Props = {
  onClick?: () => void;
}

const CommentButton = ({onClick}: Props) => {
  return (
    <button className={styles.commentButton} onClick={onClick}><AddComment/></button>
  )
}

export default CommentButton