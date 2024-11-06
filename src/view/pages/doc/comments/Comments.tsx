import { Role } from "delib-npm";
import { FC, useEffect } from "react";
import NewComment from "./newComment/NewComment";
import Comment from "./comment/Comment";
import styles from "./Comments.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../controllers/slices/userSlice";
import { commentsSelector, updateShowComments } from "../../../../controllers/slices/commentsSlice";




const Comments: FC= () => {
  
  const dispatch = useDispatch();

  const { role, statement, comments, showComments, showNewComment } = useSelector(commentsSelector);

  const userId = useSelector(selectUser)?.uid;
  const didUserCommented = comments.some((cm) => cm.creatorId === userId);

  useEffect(()=>{
    dispatch(updateShowComments(true))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[showComments])

  if(!statement) return null;

  return (
    <div>
      {role !== Role.admin && !didUserCommented && showNewComment && (
        <NewComment
          parentStatement={statement}
          order={comments.length}
          show={showNewComment}
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
