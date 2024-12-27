import { Statement } from 'delib-npm';
import { FC, useState } from 'react';
import styles from './newComment.module.scss';
import { addCommentToDB } from '../../../../../controllers/db/comments/setComments';
import { store } from '../../../../../model/store';
import { useLanguage } from '../../../../../controllers/hooks/useLanguage';
import Button from '../../../../components/buttons/button/Button';
import { ButtonType } from '../../../../../model/enumsModel';
import { useNavigate } from 'react-router-dom';

interface Props {
	parentStatement: Statement;
	order: number;
}
const NewComment: FC<Props> = ({ parentStatement, order }) => {
	const [showUserComment, setShowUserComment] = useState(true);
	const { t } = useLanguage();
    const navigate = useNavigate();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function handleAddNewComment(ev: any) {
		try {
			ev.preventDefault();
			const target = ev.target;
			const text = target['new-comment'].value;
      
			if (text) {
				const title = text.split('\n')[0];
				const description = text.split('\n').slice(1).join('\n');

				addCommentToDB({
					title,
					description,
					parentStatement,
					order,
				});

				navigate('..');
			}

			target.reset();
		} catch (error) {
			console.error(error);
		}
	}
	try {
		const user = store.getState().user.user;
		if (!user) throw new Error('User not found');

		return (
			<div className={styles.wrapper}>
				{showUserComment && (
					<form
						className={styles.wrapper__descriptionWrapper}
						onSubmit={handleAddNewComment}
					>
						<textarea
							placeholder={t('Please provide your thoughts...')}
							className={styles.wrapper__descriptionWrapper__description}
							name='new-comment'
						/>
						<div className={styles.wrapper__descriptionWrapper__buttonsWrapper}>
							<button
								className={styles.cancel}
								onClick={() => {
									setShowUserComment(false);
									navigate('..');
								}}
							>
								{t('Cancel')}
							</button>
							<Button
								type={'submit'}
								text={t('Add Comment')}
								buttonType={ButtonType.primary}
								isSelected={true}
							/>
						</div>
					</form>
				)}
			</div>
		);
	} catch (error) {
		console.error(error);
		return null;
	}
};

export default NewComment;
