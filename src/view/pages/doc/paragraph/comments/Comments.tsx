import { Role, Statement } from "delib-npm";
import { FC } from "react";
import NewComment from "./newComment/NewComment";
import Comment from "./comment/Comment";
import styles from "./Comments.module.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../controllers/slices/userSlice";

interface Props {
  role: Role;
  statement: Statement;
  comments: Statement[];
  showComments: boolean;
  showNewComment: boolean;
  setShowNewComment: (show: boolean) => void;
}

const Comments: FC<Props> = ({
  role,
  statement,
  comments,
  showComments,
  showNewComment,
  setShowNewComment,
}) => {
  const userId = useSelector(selectUser)?.uid;
  const didUserCommented = comments.some((cm) => cm.creatorId === userId);

  return (
    <div>
      {role !== Role.admin && !didUserCommented && (
        <NewComment
          parentStatement={statement}
          order={comments.length}
          show={showNewComment}
          setShow={setShowNewComment}
        />
      )}
      <div
        className={`${styles.comments} ${
          showComments ? styles.commentsOpen : styles.commentsClose
        }`}
      >
        {comments.map((comment) => (
          <Comment key={`c-${comment.statementId}`} statement={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
