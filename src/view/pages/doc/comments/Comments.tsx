import { Role } from "delib-npm";
import { FC, useContext, useEffect } from "react";
import NewComment from "./newComment/NewComment";
import Comment from "./comment/Comment";
import styles from "./Comments.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../controllers/slices/userSlice";
import {
  commentsSelector,
  updateShowComments,
  updateShowNewComment,
} from "../../../../controllers/slices/commentsSlice";
import { RoleContext } from "../Document";
import { useLanguage } from "../../../../controllers/hooks/useLanguage";
import Button from "../../../components/buttons/button/Button";

//icons
import BackArrow from "../../../../assets/icons/backArrow.svg?react";

const Comments: FC = () => {
  const dispatch = useDispatch();
  const { t, dir } = useLanguage();

  const { statement, comments, showComments, showNewComment } =
    useSelector(commentsSelector);

  const role = useContext(RoleContext);
  const userId = useSelector(selectUser)?.uid;
  const didUserCommented = comments.some((cm) => cm.creatorId === userId);
  const myComment = comments.find((cm) => cm.creatorId === userId);
  const otherComments = comments.filter((cm) => cm.creatorId !== userId);

  useEffect(() => {
    dispatch(updateShowComments(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showComments]);

  if (!statement) return null;

  function handleShowNewComment() {
    dispatch(updateShowNewComment(true));
  }

  function handleHideComments() {
    dispatch(updateShowComments(false));
  } 

  return (
    <div className={styles.box}>
      <div className={styles.back}><button onClick={handleHideComments} style={{transform:dir==="ltr"?`rotate(0deg)`:`rotate(180deg)`}}><BackArrow /></button></div>
      <p className={styles.p}>{t("Paragraph")}:</p>
      <p className={styles.paragraph}>{statement.statement}</p>
      {role !== Role.admin && !didUserCommented && showNewComment && (
        <NewComment
          parentStatement={statement}
          order={comments.length}
          show={showNewComment}
        />
      )}
      {!didUserCommented && !showNewComment && (
        <Button text={t("Add Comment")} isSelected={true} onClick={handleShowNewComment} />
      )}
      <div
        className={`${styles.comments} ${
          showComments ? styles.commentsOpen : styles.commentsClose
        }`}
      >
        {myComment && <p>{t("Your comment")}:</p>}
        {myComment && (<Comment statement={myComment} />)}
        {otherComments.length > 0 && <p>{t("Other comments")}:</p>}
        {otherComments.map((comment) => (
          <Comment key={`c-${comment.statementId}`} statement={comment} />
        ))}
      </div>
      <div className={`btns ${styles.btns}`}>
        <Button text={t("Close")} isSelected={true} onClick={handleHideComments} />
      </div>
    </div>
  );
};

export default Comments;
