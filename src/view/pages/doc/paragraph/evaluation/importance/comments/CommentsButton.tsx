import { FC } from "react";
import styles from "./CommentsButton.module.scss";
import AddComment from "../../../../../../../assets/icons/addCommentIcon.svg?react";

interface Props {
  numberOfComments: number;
  showComments: boolean;
  setShowComments: (show: boolean) => void;
}
const CommentsButton: FC<Props> = ({
  numberOfComments,
  showComments,
  setShowComments,
}) => {
  return (
    <div className={styles.comments}>
      {numberOfComments > 0 && (
        <span
          onClick={() => setShowComments(!showComments)}
          className={styles.commentsCounter}
          style={{
            width: numberOfComments < 10 ? "1.2rem" : "1.4rem",
            height: numberOfComments < 10 ? "1.2rem" : "1.4rem",
          }}
        >
          {numberOfComments < 100 ? numberOfComments : 99}
        </span>
      )}
      <button onClick={() => setShowComments(!showComments)}>
        <AddComment />
      </button>
    </div>
  );
};

export default CommentsButton;
