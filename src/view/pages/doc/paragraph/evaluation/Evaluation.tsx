import { Statement } from "delib-npm";
import { FC } from "react";
import styles from "./Evaluation.module.scss";
import Importance from "../importance/Importance";
import CommentButtonIcon from "../../../../components/buttons/CommentButton";

//icons

import ApprovalComp from "../../approval/Approval";
interface Props {
  statement: Statement;
  docStatement: Statement;
  setShowNewComment: (show: boolean) => void;
  showNewComment: boolean;
}
const Evaluation: FC<Props> = ({ statement, docStatement , setShowNewComment, showNewComment}) => {
 

  return (
    <div className={styles.evaluation}>
      <Importance statement={statement} document={docStatement} />
      <ApprovalComp statement={statement} docStatement={docStatement} />
      <CommentButtonIcon onClick={()=>setShowNewComment(!showNewComment)} />
    
    </div>
  );
};

export default Evaluation;
