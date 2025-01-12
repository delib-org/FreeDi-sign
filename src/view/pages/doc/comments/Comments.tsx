import { Role } from 'delib-npm';
import { FC, useContext } from 'react';
import NewComment from './newComment/NewComment';
import Comment from './comment/Comment';
import styles from './Comments.module.scss';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../controllers/slices/userSlice';

import { useLanguage } from '../../../../controllers/hooks/useLanguage';
import Button from '../../../components/buttons/button/Button';

//icons
import BackArrow from '../../../../assets/icons/backArrow.svg?react';
import {
	commentsSelector,
	statementSelector,
} from '../../../../controllers/slices/statementsSlice';
import { ButtonType } from '../../../../model/enumsModel';
import Likes from '../../../components/likes/Likes';
import { useNavigate, useParams } from 'react-router-dom';
import { DocumentContext } from '../documentCont';

const Comments: FC = () => {
	const { t, dir } = useLanguage();
	const navigate = useNavigate();
	const { paragraphId } = useParams();
	console.log(paragraphId)

	
	const statement = useSelector(statementSelector(paragraphId));
	const {role} = useContext(DocumentContext);
	const comments = useSelector(commentsSelector(statement?.statementId));
	const userId = useSelector(selectUser)?.uid;
	const didUserCommented = comments.some((cm) => cm.creatorId === userId);
	const myComment = comments.find((cm) => cm.creatorId === userId);
	const otherComments = comments.filter((cm) => cm.creatorId !== userId);



	function handleHideComments() {
		navigate('..');
	}

	if (!statement) return null;

	const text = statement.statement;
	const newText = text.replace(/\*/g, '');

	return (
		<div className={styles.box}>
			<div className={styles.back}>
				<button
					onClick={handleHideComments}
					style={{
						transform: dir === 'ltr' ? `rotate(0deg)` : `rotate(180deg)`,
					}}
				>
					<BackArrow />
				</button>
			</div>
			<div>
				<p className={styles.p}>{t('Paragraph')}:</p>
				<div className={styles.paragraph}>{newText}</div>
				<Likes statement={statement} />
				{role !== Role.admin && !didUserCommented && (
					<NewComment parentStatement={statement} order={comments.length} />
				)}

				{myComment && <p>{t('Your comment')}:</p>}
				{myComment && <Comment statement={myComment} />}
				{otherComments.length > 0 && <p>{t('Other comments')}:</p>}
				{otherComments.map((comment) => (
					<Comment key={`c-${comment.statementId}`} statement={comment} />
				))}
			</div>
			<div className={`btns ${styles.btns}`}>
				<Button
					text={t('Close')}
					isSelected={true}
					onClick={handleHideComments}
					buttonType={ButtonType.secondary}
				/>
			</div>
		</div>
	);
};

export default Comments;
