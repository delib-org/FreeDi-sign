import { Role } from 'delib-npm';
import { FC, useContext } from 'react';
import NewComment from './newComment/NewComment';
import Comment from './comment/Comment';
import './Comments.scss';
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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DocumentContext } from '../documentCont';

const Comments: FC = () => {
	const { t, dir } = useLanguage();
	const navigate = useNavigate();
	const { paragraphId } = useParams();
	const { search } = useLocation();

	const statement = useSelector(statementSelector(paragraphId));
	const { role } = useContext(DocumentContext);
	const comments = useSelector(commentsSelector(statement?.statementId));
	const userId = useSelector(selectUser)?.uid;
	const didUserCommented = comments.some((cm) => cm.creatorId === userId);
	const myComment = comments.find((cm) => cm.creatorId === userId);
	const otherComments = comments.filter((cm) => cm.creatorId !== userId);

	function handleHideComments() {
		console.log(search)
		navigate(`..${search}`)
	}

	if (!statement) return null;

	const text = statement.statement;
	const newText = text.replace(/\*/g, '');

	return (
		<div className='box'>
			<div className='back'>
				<button
					onClick={handleHideComments}
					style={{
						transform: dir === 'ltr' ? `rotate(0deg)` : `rotate(180deg)`,
					}}
				>
					<BackArrow />
				</button>
			</div>
			<div className='commentWrapper'>
				{/* <p className={styles.p}>{t('Paragraph')}:</p> */}
				<h2 className='paragraph'>{newText}</h2>
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
			<div className='btns'>
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
