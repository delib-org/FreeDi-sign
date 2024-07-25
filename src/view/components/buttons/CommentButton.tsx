import AddComment from '../icons/AddCommentIcon';
import styles from './buttons.module.scss';

type Props = {
  onClick?: () => void;
}

const CommentButton = ({onClick}: Props) => {
  return (
    <button className={styles.commentButton} onClick={onClick}><AddComment/> Comment</button>
  )
}

export default CommentButton