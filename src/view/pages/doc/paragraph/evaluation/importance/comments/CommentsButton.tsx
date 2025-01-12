import { FC } from 'react';
import styles from './CommentsButton.module.scss';
import AddComment from '../../../../../../../assets/icons/addCommentIcon.svg?react';
import { useLanguage } from '../../../../../../../controllers/hooks/useLanguage';
import { Statement } from 'delib-npm';
import { useNavigate } from 'react-router-dom';

interface Props {
	numberOfComments: number;
	statement: Statement;
}
const CommentsButton: FC<Props> = ({
	numberOfComments,
	statement,
}) => {
	const { t } = useLanguage();
	const navigate = useNavigate();

	function handleShowComments() {
		navigate('comments/' + statement.statementId, {
			relative: 'path',
		});
	}
	return (
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
	);
};

export default CommentsButton;
