import { FC, useState } from 'react';
import styles from './CommentsButton.module.scss';
import AddComment from '../../../../../../../assets/icons/addCommentIcon.svg?react';
import { useLanguage } from '../../../../../../../controllers/hooks/useLanguage';
import { Statement } from 'delib-npm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../../../../../../components/modal/Modal';
import NewComment from '../../../../comments/newComment/NewComment';
import Comments from '../../../../comments/Comments';

interface Props {
	numberOfComments: number;
	statement: Statement;
}
const CommentsButton: FC<Props> = ({ numberOfComments, statement }) => {
	const { t } = useLanguage();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const lobby = searchParams.get('lobby');
	const [showComments, setShowComments] = useState(false);

	function handleShowComments() {
		setShowComments(true);
	}


	return (
		<>
			<button className={styles.comments} onClick={handleShowComments}>
				{numberOfComments > 0 && (
					<span
						className={styles.commentsCounter}
						style={{
							width: numberOfComments < 10 ? '1.2rem' : '1.4rem',
							height: numberOfComments < 10 ? '1.2rem' : '1.4rem',
						}}
					>
						{numberOfComments < 100 ? numberOfComments : 99}
					</span>
				)}
				<AddComment />
				<div className={styles['comments__text']}>
					<span>{t('Comments')}</span>
				</div>
			</button>
			<Modal show={showComments} setShow={setShowComments}>
				<Comments handleHideComments={() => setShowComments(false)} statement={statement} />
			</Modal>
		</>
	);
};

export default CommentsButton;
