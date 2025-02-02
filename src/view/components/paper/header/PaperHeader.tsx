import { FC } from 'react';
import styles from './PaperHeader.module.scss';
import { Statement } from 'delib-npm';
import { useDispatch } from 'react-redux';
import { toggleIsEdit } from '../../../../controllers/slices/editSlice';
import EditIcon from '../../../../assets/icons/edit.svg?react';
import GlobousIcon from '../../../../assets/icons/globus.svg?react';
import HomeIcon from '../../../../assets/icons/home.svg?react';
import { useRole } from '../../../../controllers/hooks/useRole';
import { NavLink, useSearchParams } from 'react-router-dom';

interface Props {
	statement?: Statement;
}

const PaperHeader: FC<Props> = ({ statement }) => {
	const dispatch = useDispatch();
	const { isAdmin } = useRole();
	const [searchParams] = useSearchParams();  // Moved this hook up

	if (!statement) return null;  // Now all hooks are called before any conditionals

	const lobby = searchParams.get('lobby');
	const handleToggleEdit = () => {
		dispatch(toggleIsEdit());
	};

	return (
		<header className={styles.header} style={{ backgroundColor: statement.color }}>
			{lobby && (
				<NavLink to={`/lobby/${lobby}`} className={styles.homeButton}>
					<HomeIcon />
				</NavLink>
			)}
			<div className={styles.buttons}>
				{isAdmin && (
					<button onClick={handleToggleEdit}>
						<EditIcon />
					</button>
				)}
				{lobby ? (
					<NavLink to={`/lobby/${lobby}`}>
						שיתוף ציבור - מועצה אזורית גולן
					</NavLink>
				) : (
					<a href='https://freedi.co' target='_blank' rel='noreferrer'>
						Freedi
						<GlobousIcon />
					</a>
				)}
			</div>
		</header>
	);
};

export default PaperHeader;