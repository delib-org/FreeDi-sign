import React, { useContext } from 'react';
import styles from './BottomAside.module.scss';
import { useParams } from 'react-router-dom';
import { CSV } from '../../../../../controllers/general.ts/csv';

//icons
import DownloadIcon from '../../../../../assets/icons/downloadCloud.svg?react';
import GlobousIcon from '../../../../../assets/icons/globus.svg?react';
import { DocumentContext } from '../../documentCont';
import { Role } from 'delib-npm';

const BottomAside: React.FC = () => {
	const { statementId: documentId } = useParams<{ statementId: string }>();
	const { role } = useContext(DocumentContext);

	function onDownloadClick() {
		CSV.downloadCSV(documentId);
	}
	return (
		<div className={styles.options}>
			{role === Role.admin && (
				<button className={styles.clickable} onClick={onDownloadClick}>
					<DownloadIcon />
					<span>Download CSV</span>
				</button>
			)}
			<a
				className={styles.websiteSection}
				href='https://freedi.co'
				target='_blank'
			>
				<GlobousIcon />
				<span>FreeDi</span>
			</a>
		</div>
	);
};

export default BottomAside;
