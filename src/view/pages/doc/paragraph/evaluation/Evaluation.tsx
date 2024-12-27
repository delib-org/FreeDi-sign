import { Role, Statement } from "delib-npm";
import { FC, useContext } from "react";
import styles from "./Evaluation.module.scss";
import Importance, { fromImportanceToIcon } from "./importance/Importance";
import ApprovalComp from "./approval/Approval";
import CommentsButton from "./importance/comments/CommentsButton";
import { RoleContext } from "../../Document";
import { useSelector } from "react-redux";
import { selectEvaluationSettings } from "../../../../../controllers/slices/evaluationSlice";
import { commentsSelector } from "../../../../../controllers/slices/statementsSlice";

//icons

interface Props {
  statement: Statement;
}
const Evaluation: FC<Props> = ({ statement }) => {
  const { comment, approve, importance } = useSelector(
    selectEvaluationSettings(statement.documentSettings?.parentDocumentId)
  ) || { comment: false, approve: false, importance: false };

  const comments = useSelector(commentsSelector(statement.statementId)).sort(
      (a, b) => b.createdAt - a.createdAt
    );

  const numberOfComments = comments.length;
  const role = useContext(RoleContext);

  try {
    return (
      <div
        className={`${styles.evaluation} ${
          role === Role.admin ? styles.evaluationAdmin : null
        }`}
      >
        {approve && <ApprovalComp statement={statement} />}
        {/* <VerticalHR /> */}

        {role !== Role.admin ? (
          <>{importance && <Importance statement={statement} />}</>
        ) : importance ? (
          <div className={styles.importance}>
            {fromImportanceToIcon(
              statement.documentImportance?.averageImportance || 0
            )}
            <span>{statement.documentImportance?.sumImportance}</span>
          </div>
        ) : null}
        {comment && (
          <CommentsButton
            numberOfComments={numberOfComments}
            statement={statement}
          />
        )}
      </div>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default Evaluation;
