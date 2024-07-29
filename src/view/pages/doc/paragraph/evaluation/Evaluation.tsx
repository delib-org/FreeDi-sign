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
  setShowComments: (show: boolean) => void;
  showComments: boolean;
}
const Evaluation: FC<Props> = ({ statement, docStatement , setShowComments, showComments}) => {
  const comments = useSelector(commentsSelector(statement.statementId));

  return (
    <div className={styles.evaluation}>
      <Importance statement={statement} document={docStatement} />
      <ApprovalComp statement={statement} docStatement={docStatement} />
      <CommentButtonIcon onClick={()=>setShowComments(!showComments)} />
    
    </div>
  );
};

export default Evaluation;
