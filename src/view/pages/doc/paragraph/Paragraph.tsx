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
  try {
    const textarea = useRef<HTMLTextAreaElement>(null);
    const comments = useSelector(commentsSelector(statement.statementId)).sort(
      (a, b) => b.createdAt - a.createdAt
    );
    const [showComments, setShowComments] = useState<boolean>(false);
    const [showNewComment, setShowNewComment] = useState<boolean>(false);
    const isEdit = useSelector(isEditSelector);
    const [_isEdit, _setIsEdit] = useState(false);

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
        {isEdit && _isEdit ? (
          <textarea
            ref={textarea}
            placeholder="Enter Text ... "
            autoFocus={true}
            defaultValue={statement.statement}
            className={`${styles.textArea} ${styles.textAreaEdit}`}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              adjustTextAreaHeight(e.target);
              updateParagraphTextToDB({ statement, newText: e.target.value });
            }}
            onBlur={handleUpdate}
            onKeyUp={handleUpdate}
          />
        ) : (
          <p
            className={`${styles.textArea} ${styles.textAreaP}`}
            onClick={() => {
              _setIsEdit(true);
            }}
          >
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

    function handleUpdate(e: any) {
      if (e.key === "Enter" || e.type === "blur") {
        _setIsEdit(false);
        const textarea = e.target as HTMLTextAreaElement;
        if (textarea.value === "") {
          textarea.value = statement.statement;
        }

        //remove new lines
        textarea.value = textarea.value.replace(/\n/g, " ");
        updateParagraphTextToDB({ statement, newText: textarea.value });
       
      }
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default Paragraph;
