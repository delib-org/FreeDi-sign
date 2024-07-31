import { Statement } from "delib-npm";
import { FC } from "react";
import styles from "./Evaluation.module.scss";
import Importance from "../importance/Importance";
import AddComment from "../../../../../assets/icons/addCommentIcon.svg?react";

//icons

import ApprovalComp from "../../approval/Approval";
interface Props {
  statement: Statement;
  docStatement: Statement;
  showComments: boolean;
  setShowComments: (show: boolean) => void;
  numberOfComments: number;
}
const Evaluation: FC<Props> = ({
  statement,
  docStatement,
  showComments,
  setShowComments,
  numberOfComments,
}) => {
  return (
    <div className={styles.evaluation}>
      <Importance statement={statement} document={docStatement} />
      <ApprovalComp statement={statement} docStatement={docStatement} />
      <div className={styles.comments}>
        {numberOfComments > 0 && (
          <span
            style={{
              width: numberOfComments < 10 ? "1.3rem" : "1.5rem",
              height: numberOfComments < 10 ? "1.3rem" : "1.5rem",
            }}
          >
            {numberOfComments < 100 ? numberOfComments : 99}
          </span>
        )}
        <button>
          <AddComment onClick={() => setShowComments(!showComments)} />
        </button>
      </div>
    </div>
  );
};

export default Evaluation;
