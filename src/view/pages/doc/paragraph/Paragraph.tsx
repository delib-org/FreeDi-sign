import { Statement } from "delib-npm";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { commentsSelector } from "../../../../controllers/slices/statementsSlice";
import styles from "./Paragraph.module.scss";
import { isEditSelector } from "../../../../controllers/slices/editSlice";
import { adjustTextAreaHeight } from "./paragraphCont";
import { updateParagraphTextToDB } from "../../../../controllers/db/paragraphs/setParagraphs";
import Evaluation from "./evaluation/Evaluation";
import Comment from "../comment/Comment";
import CommentButtonIcon from "../../../components/buttons/CommentButton";
import NewComment from "../newComment/NewComment";

interface Props {
  statement: Statement;
  docStatement: Statement;
}
const Paragraph: FC<Props> = ({ statement, docStatement }) => {
  const comments = useSelector(commentsSelector(statement.statementId));
  const [showComments, setShowComments] = useState<boolean>(true);
  const [newComment, setNewComment] = useState<boolean>(false);
  const isEdit = useSelector(isEditSelector);

  useEffect(() => {
    //get the previous value of isEdit
  }, [isEdit]);

  function commentsHandler() {
    return setNewComment(!newComment);
  }

  console.log("newComment", newComment);
  return (
    <div className={styles.paragraph}>
      {isEdit ? (
        <textarea
          defaultValue={statement.statement}
          className={`${styles.textArea} ${styles.textAreaEdit}`}
          onChange={(e) => {
            adjustTextAreaHeight(e.target);
            updateParagraphTextToDB({ statement, newText: e.target.value });
          }}
          onBlur={(e) =>
            updateParagraphTextToDB({ statement, newText: e.target.value })
          }
        />
      ) : (
        <p className={`${styles.textArea} ${styles.textAreaP}`}>
          {statement.statement}
        </p>
      )}
      <Evaluation statement={statement} docStatement={docStatement} setNewComment={commentsHandler}/>
      {newComment && <NewComment
        docStatement={docStatement}
        order={comments.length}
        parentId={statement.statementId}
      />}
      {showComments && (
        <>
        
          {comments.map((comment) => (
            <Comment key={`c-${comment.statementId}`} statement={comment} />
          ))}
        </>
      )}
    </div>
  );
};

export default Paragraph;
