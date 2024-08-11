import { Statement } from "delib-npm";
import { FC } from "react";
import styles from "./Evaluation.module.scss";
import Importance from "../importance/Importance";
import AddComment from "../../../../../assets/icons/addCommentIcon.svg?react";

//icons

import ApprovalComp from "../../approval/Approval";
import VerticalHR from "../../../../components/VerticalHR/VerticalHR";
import { documentSelectorByStatementId } from "../../../../../controllers/slices/statementsSlice";
import { useSelector } from "react-redux";
interface Props {
  statement: Statement;
  showComments: boolean;
  setShowComments: (show: boolean) => void;
  numberOfComments: number;
}
const Evaluation: FC<Props> = ({
  statement,
  showComments,
  setShowComments,
  numberOfComments,
}) => {
  try {
  

    return (
      <div className={styles.evaluation}>
        <Importance statement={statement} />
        <VerticalHR />
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
        <VerticalHR />
        <ApprovalComp statement={statement} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default Evaluation;
