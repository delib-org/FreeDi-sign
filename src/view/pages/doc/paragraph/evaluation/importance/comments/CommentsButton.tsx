import { FC } from "react";
import styles from "./CommentsButton.module.scss";
import AddComment from "../../../../../../../assets/icons/addCommentIcon.svg?react";

interface Props {
  numberOfComments: number;
  showComments: boolean;
  setShowComments: (show: boolean) => void;
}
const CommentsButton:FC<Props> = ({numberOfComments,showComments,setShowComments}) => {
  return (
    <div className={styles.comments}>
      {numberOfComments > 0 && (
        <span
          style={{
            width: numberOfComments < 10 ? "1.3rem" : "1.5rem",
            height: numberOfComments < 10 ? "1.3rem" : "1.5rem",
          }}
        >
          {numberOfComments < 100 ? numberOfComments : 99}
        </span>
      )}
      <button>
        <AddComment onClick={() => setShowComments(!showComments)} />
      </button>
    </div>
  );
};

export default CommentsButton;
