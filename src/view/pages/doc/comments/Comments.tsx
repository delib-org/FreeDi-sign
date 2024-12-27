import { Role } from "delib-npm";
import { FC, useContext, useEffect } from "react";
import NewComment from "./newComment/NewComment";
import Comment from "./comment/Comment";
import styles from "./Comments.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../controllers/slices/userSlice";
import {
  commentsSelector as cmsSelector,
  updateShowComments,
  updateShowNewComment,
} from "../../../../controllers/slices/commentsSlice";
import { RoleContext } from "../Document";
import { useLanguage } from "../../../../controllers/hooks/useLanguage";
import Button from "../../../components/buttons/button/Button";

//icons
import BackArrow from "../../../../assets/icons/backArrow.svg?react";
import { commentsSelector } from "../../../../controllers/slices/statementsSlice";
import { ButtonType } from "../../../../model/enumsModel";
import Likes from "../../../components/likes/Likes";
import { DocumentContext } from "../documentCont";

const Comments: FC = () => {
  const dispatch = useDispatch();
  const { t, dir } = useLanguage();

  const { statement, showComments, showNewComment } = useSelector(cmsSelector);
  const comments = useSelector(commentsSelector(statement?.statementId));
  const role = useContext(DocumentContext).role;
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

  const text = statement.statement;
  const newText = text.replace(/\*/g, '');

  return (
    <div className={styles.box}>
      <div className={styles.back}>
        <button
          onClick={handleHideComments}
          style={{
            transform: dir === "ltr" ? `rotate(0deg)` : `rotate(180deg)`,
          }}
        >
          <BackArrow />
        </button>
      </div>
      <div
        className={`${styles.comments} ${
          showComments ? styles.commentsOpen : styles.commentsClose
        }`}
      >
      <p className={styles.p}>{t("Paragraph")}:</p>
      <div className={styles.paragraph}>{newText}</div>
        <Likes statement={statement} />
        {role !== Role.admin && !didUserCommented && showNewComment && (
          <NewComment
            parentStatement={statement}
            order={comments.length}
            show={showNewComment}
          />
        )}
        {!didUserCommented && !showNewComment && (
          <Button
            text={t("Add Comment")}
            isSelected={true}
            onClick={handleShowNewComment}
          />
        )}

        {myComment && <p>{t("Your comment")}:</p>}
        {myComment && <Comment statement={myComment} />}
        {otherComments.length > 0 && <p>{t("Other comments")}:</p>}
        {otherComments.map((comment) => (
          <Comment key={`c-${comment.statementId}`} statement={comment} />
        ))}
      </div>
      <div className={`btns ${styles.btns}`}>
        <Button
          text={t("Close")}
          isSelected={true}
          onClick={handleHideComments}
          buttonType={ButtonType.secondary}
        />
      </div>
    </div>
  );
};

export default Comments;
