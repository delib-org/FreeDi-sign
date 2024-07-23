import { Statement } from "delib-npm";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { commentsSelector } from "../../../../controllers/slices/statementsSlice";
import NewComment from "../newComment/NewComment";
import Comment from "../comment/Comment";
import styles from "./Paragraph.module.scss";
import { isEditSelector } from "../../../../controllers/slices/editSlice";
import { adjustTextAreaHeight } from "./paragraphCont";
import { updateParagraphTextToDB } from "../../../../controllers/db/paragraphs/setParagraphs";
import Importance from "./importance/Importance";

interface Props {
  statement: Statement;
  docStatement: Statement;
}
const Paragraph: FC<Props> = ({ statement, docStatement }) => {
  const isEdit = useSelector(isEditSelector);
  const comments = useSelector(commentsSelector(statement.statementId));

  useEffect(() => {
    //get the previous value of isEdit
  }, [isEdit]);



  return (
    <div className={styles.paragraph}>
      <div className={styles.paragraph__approval}>
        <button>Approve</button>
        <button>Reject</button>
      </div>
      {!isEdit ? (
        <p><span>{statement.statement}</span> <span>{Math.round((statement.importanceData?.sumImportance || 0) * 100)/100}</span> <span>( {statement.importanceData?.numberOfUsers || 0})</span></p>
      ) : (
        <textarea
          className={styles.textArea}
          defaultValue={statement.statement}
          onChange={(e) => {
            adjustTextAreaHeight(e.target);
            updateParagraphTextToDB({ statement, newText: e.target.value });
          }}
          onBlur={(e) => updateParagraphTextToDB({ statement, newText: e.target.value })}
        >
          
        </textarea>
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
