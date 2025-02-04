import { Role, Statement } from 'delib-npm';
import { FC, useContext, useEffect, useState } from 'react';
import styles from './Comment.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../../../controllers/slices/userSlice';
import { setAgreesToDB } from '../../../../../controllers/db/agree/setAgrees';
import { listenToUserAgree } from '../../../../../controllers/db/agree/getAgree';
import {
	selectAgree,
	updateAgree,
} from '../../../../../controllers/slices/agreeSlice';
import Button from '../../../../components/buttons/button/Button';
import { useLanguage } from '../../../../../controllers/hooks/useLanguage';
import Text from '../../../../components/text/Text';
import { ButtonType } from '../../../../../model/enumsModel';
import UserDetails from './userDetails/UserDetails';
import { DocumentContext } from '../../documentCont';
import { deleteCommentFromDB } from '../../../../../controllers/db/comments/setComments';
import { deleteComment } from '../../../../../controllers/slices/commentsSlice';

interface Props {
	statement: Statement;
}

const Comment: FC<Props> = ({ statement }) => {
	const { t } = useLanguage();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const agree = useSelector(selectAgree(statement.statementId));
	const role = useContext(DocumentContext).role;

	const [showDetails, setShowDetails] = useState(false);

	const isCreator = user?.uid === statement.creatorId;

	useEffect(() => {
		let unsubscribe = () => { };

		unsubscribe = listenToUserAgree(statement.statementId);

		return () => {
			unsubscribe();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handleAgree(_agree: number) {
		if (isCreator) return;

		let __agree = 0;
		if (agree?.agree !== _agree) {
			__agree = _agree;
		}
		dispatch(
			updateAgree({
				agree: __agree,
				statementId: statement.statementId,
			})
		);
		setAgreesToDB({ statement, agree: __agree });
	}

	const isAuthor = user?.uid === statement.creatorId;
	const isAdmin = role === Role.admin;

	const displayName = (statement.creatorData as any)['ישוב'] ?? t('Anonymous');
	const finalName = (statement.creatorData as any)['ישוב']
		? 'תושב/ת ' + displayName
		: displayName;

	function handleShowUserDetails() {
		if (isAdmin) {
			setShowDetails(!showDetails);
		}
	}

	function handleDeleteComment() {
		const isDelete = confirm('Are you sure you want to delete this comment?');
		if (isDelete) {
			dispatch(deleteComment(statement));
			deleteCommentFromDB(statement);
		}
	}

	return (
		<div className={styles.commentBox}>
			<div
				className={styles.name}
				style={{ cursor: isAdmin ? 'pointer' : 'auto' }}
				onClick={handleShowUserDetails}
			>
				{finalName}
			</div>
			<div className={styles.comment}>
				<div
					className={styles.description}
					style={{
						borderLeft: isAuthor
							? '4px solid var(--icon-blue)'
							: '1px solid var(--icon-blue)',
					}}
				>
					<div className={styles.text}>
						<Text statement={statement} allowEditing={true} />
					</div>
					<div className={styles.btns}>
						{statement.documentAgree?.disagree || 0}
						{isAuthor ? (
							<div className={styles.disagree}>{t('Disagreed')}</div>
						) : (
							<Button
								type='button'
								text={t('Disagree')}
								onClick={() => handleAgree(-1)}
								isSelected={(agree && agree?.agree < 0) || isCreator}
								buttonType={ButtonType.reject}
								isDisabled={isCreator}
							/>
						)}
						{/* onClick={() => handleAgree(AgreeDisagreeEnum.Agree)} */}
						{isAuthor ? (
							<div className={styles.agree}>{t('Agreed')}</div>
						) : (
							<Button
								type='button'
								text={t('Agree')}
								onClick={() => handleAgree(1)}
								isSelected={(agree && agree?.agree > 0) || isCreator}
								buttonType={ButtonType.approve}
								isDisabled={isCreator}
							/>
						)}
						{statement.documentAgree?.agree || 0}
					</div>
				</div>
			</div>
			{isAdmin && showDetails && (
				<div>
					<UserDetails creatorData={statement.creatorData} />
					<div className={`${styles.btns} btns`}>
						<button className="btn btn--danger" onClick={handleDeleteComment}>Delete comment</button>
						<button className="btn" onClick={handleShowUserDetails}>Close</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Comment;
