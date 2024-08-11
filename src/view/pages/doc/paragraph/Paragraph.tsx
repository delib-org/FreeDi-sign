import { Statement } from "delib-npm";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentsSelector, deleteStatement, documentSelectorByStatementId } from "../../../../controllers/slices/statementsSlice";
import styles from "./Paragraph.module.scss";
import { isEditSelector } from "../../../../controllers/slices/editSlice";
import { updateParagraphTextToDB } from "../../../../controllers/db/paragraphs/setParagraphs";
import Evaluation from "./evaluation/Evaluation";
import Comment from "../comment/Comment";
import NewComment from "../newComment/NewComment";
import { adjustTextAreaHeight } from "../../../../controllers/general.ts/general";
import { deleteParagraphFromDB } from "../../../../controllers/db/paragraphs/setParagraphs";
import DeleteIcon from '../../../../assets/icons/trash.svg?react';

interface Props {
  statement: Statement;
}
const Paragraph: FC<Props> = ({ statement }) => {
  try {
   
    const dispatch = useDispatch();
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
    }, [isEdit, textarea, _isEdit]);

    useEffect(() => {}, [textarea]);

    function handleDelete() {
      const shouldDelete = confirm("Are you sure you want to delete this paragraph?")
      if(!shouldDelete) return;
      deleteParagraphFromDB(statement);
      dispatch(deleteStatement(statement.statementId));
    }

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
          <div className={styles.paragraphText}>
            <p
              className={`${styles.textArea} ${styles.textAreaP}`}
              onClick={() => {
                _setIsEdit(true);
              }}
            >
              {statement.statement}
            </p>
            <button onClick={handleDelete}><DeleteIcon /></button>
          </div>
        )}
        {!isEdit && <Evaluation
          statement={statement}
          showComments={showComments}
          setShowComments={setShowComments}
          numberOfComments={comments.length}
        />}

        {showComments && !isEdit && (
          <>
            <NewComment
              parentStatement={statement}
              order={comments.length}
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
