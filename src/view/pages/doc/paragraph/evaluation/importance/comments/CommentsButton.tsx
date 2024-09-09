import { FC } from "react";
import styles from "./CommentsButton.module.scss";
import AddComment from "../../../../../../../assets/icons/addCommentIcon.svg?react";
import { useLanguage } from "../../../../../../../controllers/hooks/useLanguage";

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
  const {t} = useLanguage();
  return (
    <div className={styles.comments} onClick={() => setShowComments(!showComments)}>
      {numberOfComments > 0 && (
        <span
          className={styles.commentsCounter}
          style={{
            width: numberOfComments < 10 ? "1.2rem" : "1.4rem",
            height: numberOfComments < 10 ? "1.2rem" : "1.4rem",
          }}
        >
          {numberOfComments < 100 ? numberOfComments : 99}
        </span>
      )}
      <button>
        <AddComment />
      </button>
      <div className={styles["comments__text"]}>
        <span>{t("Comments")}</span>
      </div>
    </div>
  );
};

export default CommentsButton;
