import { Statement } from "delib-npm";
import { FC } from "react";
import { useSelector } from "react-redux";
import { commentsSelector } from "../../../../controllers/slices/statementsSlice";
import NewComment from "../newComment/NewComment";
import Comment from "../comment/Comment";

interface Props {
  statement: Statement;
  docStatement: Statement;
}
const Paragraph: FC<Props> = ({ statement,docStatement }) => {
  const comments = useSelector(commentsSelector(statement.statementId))
  return (
    <div className="paragraph">
      <p>
        {statement.statement} {statement.statementId}
      </p>
      <NewComment docStatement={docStatement} order={comments.length} parentId={statement.statementId} />
      {comments.map((comment) => (<Comment key={`c-${comment.statementId}`} statement={comment} />))}
    </div>
  );
};

export default Paragraph;
