import { FC } from 'react';
import styles from './header.module.scss';

//icons
import Home from '../../../assets/icons/home.svg?react';
import { Statement } from 'delib-npm';

interface Props {
	statement?: Statement;
}

const Header: FC<Props> = ({ statement }) => {
	return (
		<header className={styles.header}>
			<div className={styles.right}>
				<div className={styles.icons}>
					{statement && (
						<a
							href={`https://freedi.tech/statement/${statement.statementId}/info`}
						>
							<button className={styles.icon}>
								<Home />
							</button>
						</a>
					)}
				</div>
				<div className={styles.lastModified}>
					Last Modified:
					<span>09:05 17/6/2024</span>
				</div>
			</div>
		</header>
	);
};

export default Header;
