import { Statement } from "delib-npm";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { commentsSelector } from "../../../../controllers/slices/statementsSlice";
import NewComment from "../newComment/NewComment";
import Comment from "../comment/Comment";
import styles from "./Paragraph.module.scss";
import { isEditSelector } from "../../../../controllers/slices/editSlice";
import { adjustTextAreaHeight } from "./paragraphCont";
import { updateParagraphTextToDB } from "../../../../controllers/db/paragraphs/setParagraphs";
import Importance from "./importance/Importance";
import CommentButtonIcon from "../../../components/buttons/CommentButton";
import EditInput from "../../../components/editInput/EditInput";
import Approval from "../approval/Approval";

interface Props {
  statement: Statement;
  docStatement: Statement;
}
const Paragraph: FC<Props> = ({ statement, docStatement }) => {
  const isEdit = useSelector(isEditSelector);
  const comments = useSelector(commentsSelector(statement.statementId));
  const [showComments, setShowComments] = useState<boolean>(false);

  useEffect(() => {
    //get the previous value of isEdit
  }, [isEdit]);

  function commentsHandler() {
    return setShowComments(!showComments);
  }

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
          <p className={`${styles.textArea} ${styles.textAreaP}`}>{statement.statement}</p>
        )}
      <div className={styles.paragraph__approval}>
        
        <div className={styles.paragraph__approval__buttons}>
          <CommentButtonIcon onClick={commentsHandler} />
          <Approval statement={statement} docStatement={docStatement}/>
        </div>
      </div>
      {showComments && (
        <>
          <NewComment
            docStatement={docStatement}
            order={comments.length}
            parentId={statement.statementId}
          />
          {comments.map((comment) => (
            <Comment key={`c-${comment.statementId}`} statement={comment} />
          ))}
        </>
      )}

      {!isEdit ? (
        <p>
          <span>
            {Math.round((statement.importanceData?.sumImportance || 0) * 100) /
              100}
          </span>{" "}
          <span>( {statement.importanceData?.numberOfUsers || 0})</span>
        </p>
      ) : (
        <textarea
          className={styles.textArea}
          defaultValue={statement.statement}
          onChange={(e) => {
            adjustTextAreaHeight(e.target);
            updateParagraphTextToDB({ statement, newText: e.target.value });
          }}
          onBlur={(e) =>
            updateParagraphTextToDB({ statement, newText: e.target.value })
          }
        ></textarea>
      )}
      <Importance statement={statement} document={docStatement} />
      <NewComment
        docStatement={docStatement}
        order={comments.length}
        parentId={statement.statementId}
      />
      {comments.map((comment) => (
        <Comment key={`c-${comment.statementId}`} statement={comment} />
      ))}
    </div>
  );
};

export default Paragraph;
