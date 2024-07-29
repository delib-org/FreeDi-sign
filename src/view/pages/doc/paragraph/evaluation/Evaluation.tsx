import { Statement } from "delib-npm";
import { FC } from "react";
import styles from "./Evaluation.module.scss";
import Importance from "../importance/Importance";
import CommentButtonIcon from "../../../../components/buttons/CommentButton";

//icons

import ApprovalComp from "../../approval/Approval";
import { commentsSelector } from "../../../../../controllers/slices/statementsSlice";
import { useSelector } from "react-redux";
interface Props {
  statement: Statement;
  docStatement: Statement;
  setNewComment: () => void;
}
const Evaluation: FC<Props> = ({ statement, docStatement ,setNewComment}) => {
  const comments = useSelector(commentsSelector(statement.statementId));

  return (
    <div className={styles.evaluation}>
      {statement.statementId}
      <Importance statement={statement} document={docStatement} />
      <ApprovalComp statement={statement} docStatement={docStatement} />
      <CommentButtonIcon onClick={setNewComment} />
    
    </div>
  );
};

export default Evaluation;
