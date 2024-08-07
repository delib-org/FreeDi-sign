import { Statement } from "delib-npm";
import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { commentsSelector } from "../../../../controllers/slices/statementsSlice";
import styles from "./Paragraph.module.scss";
import { isEditSelector } from "../../../../controllers/slices/editSlice";
import { adjustTextAreaHeight } from "./paragraphCont";
import { updateParagraphTextToDB } from "../../../../controllers/db/paragraphs/setParagraphs";
import Evaluation from "./evaluation/Evaluation";
import Comment from "../comment/Comment";
import NewComment from "../newComment/NewComment";

interface Props {
  statement: Statement;
  docStatement: Statement;
}
const Paragraph: FC<Props> = ({ statement, docStatement }) => {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const comments = useSelector(commentsSelector(statement.statementId)).sort(
    (a, b) => b.createdAt - a.createdAt
  );
  const [showComments, setShowComments] = useState<boolean>(false);
  const [showNewComment, setShowNewComment] = useState<boolean>(false);
  const isEdit = useSelector(isEditSelector);

  useEffect(() => {
    //get the previous value of isEdit
  }, [isEdit]);
  
  useEffect(() => {
    if (isEdit && textarea.current) {
      adjustTextAreaHeight(textarea.current);
    }
  }, [isEdit]);

  return (
    <div className={styles.paragraph}>
      {isEdit ? (
        <textarea
          ref={textarea}
          placeholder={
            statement.statement !== "" ? statement.statement : "Enter Text ... "
          }
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
      <Evaluation
        statement={statement}
        docStatement={docStatement}
        showComments={showComments}
        setShowComments={setShowComments}
        numberOfComments={comments.length}
      />

      {showComments && (
        <>
          <NewComment
            docStatement={docStatement}
            order={comments.length}
            paragraphStatement={statement}
            parentStatement={statement}
            show={showNewComment}
            setShow={setShowNewComment}
          />
          <div
            className={`${styles.comments} ${
              showComments ? styles.commentsOpen : styles.commentsClose
            }`}
          >
            {comments.map((comment) => (
              <Comment key={`c-${comment.statementId}`} statement={comment} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Paragraph;
