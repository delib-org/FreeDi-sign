import { Statement } from "delib-npm";
import { FC } from "react";
import styles from "./Evaluation.module.scss";
import Importance from "../importance/Importance";
import NewComment from "../../newComment/NewComment";

//icons

import ApprovalComp from "../../approval/Approval";
import { commentsSelector } from "../../../../../controllers/slices/statementsSlice";
import { useSelector } from "react-redux";
interface Props {
  statement: Statement;
  docStatement: Statement;
}
const Evaluation: FC<Props> = ({ statement, docStatement }) => {
  const comments = useSelector(commentsSelector(statement.statementId));

  return (
    <div className={styles.evaluation}>
      <Importance statement={statement} document={docStatement} />
      <NewComment
        docStatement={docStatement}
        order={comments.length}
        parentId={statement.statementId}
      />
      <ApprovalComp statement={statement} docStatement={docStatement} />
    </div>
  );
};

export default Evaluation;
