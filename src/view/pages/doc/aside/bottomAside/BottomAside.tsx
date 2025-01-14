import { useContext, useState } from 'react';
import styles from './BottomAside.module.scss';
import { useParams } from 'react-router-dom';
import { CSV } from '../../../../../controllers/general.ts/csv';

//icons
import DownloadIcon from '../../../../../assets/icons/downloadCloud.svg?react';
import GlobousIcon from '../../../../../assets/icons/globus.svg?react';
import SettingIcon from '../../../../../assets/icons/settings.svg?react';
import { DocumentContext } from '../../documentCont';
import { Role } from 'delib-npm';
import Modal from '../../../../components/modal/Modal';
import Settings from '../../../../components/settings/Settings';

const BottomAside: React.FC = () => {
	const { statementId: documentId } = useParams<{ statementId: string }>();
	const { role } = useContext(DocumentContext);

	const [showSettings, setShowSettings] = useState(false);

	function onDownloadClick() {
		CSV.downloadCSV(documentId);
	}

	function handleSettingsClick(event: React.MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();
		setShowSettings(!showSettings);
	}
	return (
		<div className={styles.options}>
			{role === Role.admin && (
				<button className={styles.clickable} onClick={onDownloadClick}>
					<DownloadIcon />
					<span>Download CSV</span>
				</button>
			)}
			{role === Role.admin && (
				<button className={styles.clickable} onClick={handleSettingsClick}>
					<SettingIcon />
					<span>Settings</span>
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
			{showSettings && <Modal onClick={handleSettingsClick}><Settings /></Modal>}
		</div>
	);
};

export default BottomAside;
