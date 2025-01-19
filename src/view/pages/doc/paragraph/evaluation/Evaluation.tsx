import {  Statement } from 'delib-npm';
import { FC } from 'react';
import styles from './Evaluation.module.scss';
import Importance, { fromImportanceToIcon } from './importance/Importance';
import ApprovalComp from './approval/Approval';
import CommentsButton from './importance/comments/CommentsButton';
import { useSelector } from 'react-redux';
import { selectEvaluationSettings } from '../../../../../controllers/slices/evaluationSlice';
import { commentsSelector } from '../../../../../controllers/slices/statementsSlice';
import { useRole } from '../../../../../controllers/hooks/useRole';

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
	const {isAdmin} = useRole();

	try {
		return (
			<div
				className={`${styles.evaluation} ${
					isAdmin ? styles.evaluationAdmin : null
				}`}
			>
				{approve && <ApprovalComp statement={statement} />}
				{/* <VerticalHR /> */}

				{!isAdmin ? (
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
