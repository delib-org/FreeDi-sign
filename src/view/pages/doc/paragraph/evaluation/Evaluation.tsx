import { Role, Statement } from "delib-npm";
import { FC, useContext } from "react";
import styles from "./Evaluation.module.scss";
import Importance from "./importance/Importance";
import ApprovalComp from "./approval/Approval";
import VerticalHR from "../../../../components/VerticalHR/VerticalHR";
import CommentsButton from "./importance/comments/CommentsButton";
import { RoleContext } from "../../Document";

//icons

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
  const role = useContext(RoleContext);
  try {
    return (
      <div
        className={`${styles.evaluation} ${
          role === Role.admin ? styles.evaluationAdmin : null
        }`}
      >
        {role !== Role.admin && (
          <>
            <Importance statement={statement} />
            <VerticalHR />
          </>
        )}
        <CommentsButton
          numberOfComments={numberOfComments}
          showComments={showComments}
          setShowComments={setShowComments}
        />
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
