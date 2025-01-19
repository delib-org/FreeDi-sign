import { FC } from 'react';
import styles from './PaperHeader.module.scss';
import { Statement } from 'delib-npm';
import { useDispatch } from 'react-redux';
import { toggleIsEdit } from '../../../../controllers/slices/editSlice';

import EditIcon from '../../../../assets/icons/edit.svg?react';
import GlobousIcon from '../../../../assets/icons/globus.svg?react';
import { useRole } from '../../../../controllers/hooks/useRole';

interface Props {
	statement?: Statement;
}

const PaperHeader: FC<Props> = ({ statement }) => {
	const dispatch = useDispatch();
	const { isAdmin } = useRole();
	if (!statement) return null;

	const handleToggleEdit = () => {
		dispatch(toggleIsEdit());
	};

	return (
		<header className={styles.header}>
			<div className={styles.buttons}>
				{isAdmin && (
					<button onClick={handleToggleEdit}>
						<EditIcon />
					</button>
				)}
				<a href='https://freedi.co' target='_blank' rel='noreferrer'>
					Freedi
					<GlobousIcon />
				</a>
			</div>
		</header>
	);
};

export default PaperHeader;
