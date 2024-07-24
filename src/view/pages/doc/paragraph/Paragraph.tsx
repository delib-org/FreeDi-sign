import { Statement } from "delib-npm";
import { FC } from "react";
import { useSelector } from "react-redux";
import { commentsSelector } from "../../../../controllers/slices/statementsSlice";
import NewComment from "../newComment/NewComment";
import Comment from "../comment/Comment";
import styles from "./Paragraph.module.scss";

interface Props {
  statement: Statement;
  docStatement: Statement;
}
const Paragraph: FC<Props> = ({ statement, docStatement }) => {
  const comments = useSelector(commentsSelector(statement.statementId));
  return (
    <div className={styles.paragraph}>
      <div className={styles.paragraph__approval}>
        <p>{statement.statement}</p>
        <div className={styles.paragraph__approval__buttons}>
          <button>Approve</button>
          <button>Reject</button>
        </div>
      </div>
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
