import { FC, useContext } from "react";
import styles from "./CommentsButton.module.scss";
import AddComment from "../../../../../../../assets/icons/addCommentIcon.svg?react";
import { useLanguage } from "../../../../../../../controllers/hooks/useLanguage";
import { useDispatch } from "react-redux";
import {  setComments } from "../../../../../../../controllers/slices/commentsSlice";
import {  Statement } from "delib-npm";
import { DocumentContext } from "../../../../documentCont";

interface Props {
  numberOfComments: number;
  statement:Statement,

  comments:Statement[]

}
const CommentsButton: FC<Props> = ({
  numberOfComments,
  statement,
  comments=[]

}) => {
  const role = useContext(DocumentContext).role;
  const dispatch = useDispatch();
  const {t} = useLanguage();

  function handleShowComments(){
    dispatch(setComments({statement, role, comments, showComments:true, showNewComment:true}))
  }
  return (
    <div className={styles.comments} onClick={handleShowComments}>
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
