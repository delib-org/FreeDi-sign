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
	) || { comment: false, approve: false, importance: true };

	const comments = useSelector(commentsSelector(statement.statementId)).sort(
		(a, b) => b.createdAt - a.createdAt
	);

	const numberOfComments = comments.length;
	const {isAdmin} = useRole();
	const averageImportance = Math.round((statement.documentImportance?.averageImportance ?? 0)*1000)/1000;
	const sumImportance = Math.round((statement.documentImportance?.sumImportance ?? 0)*1000)/1000;
	const evaluators = statement.documentImportance?.numberOfUsers ?? 0;

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
					importance && <Importance statement={statement} />
				) : (
					importance && (
						<div className={styles.importance}>
							{fromImportanceToIcon(averageImportance || 0)}
							<span>{sumImportance} ({evaluators})</span>
						</div>
					)
				)}
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
