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
import { useLanguage } from '../../../../../controllers/hooks/useLanguage';

const BottomAside: React.FC = () => {
	const { statementId: documentId } = useParams<{ statementId: string }>();
	const { role } = useContext(DocumentContext);
	const { t } = useLanguage();

	const [showSettings, setShowSettings] = useState(false);

	function onDownloadClick(dataType: "lobby" | "document") {
		if (dataType === "lobby") return CSV.downloadCSV({ lobbyId: documentId });
		if (dataType === "document") return CSV.downloadCSV({ documentId });
	}

	function handleSettingsClick() {
		
		setShowSettings(!showSettings);
	}
	return (
		<div className={styles.options}>
			{role === Role.admin && (
				<>
					<button className={styles.clickable} onClick={() => onDownloadClick("document")}>
						<DownloadIcon />
						<span>{t("Document")}</span>
					</button>
					<button className={styles.clickable} onClick={() => onDownloadClick("lobby")}>
						<DownloadIcon />
						<span>{t("Lobby")}</span>
					</button>
				</>

			)}
			{role === Role.admin && (
				<button className={styles.clickable} onClick={handleSettingsClick}>
					<SettingIcon />
					<span>{t("Settings")}</span>
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
			<Modal show={showSettings} setShow={handleSettingsClick}><Settings /></Modal>
		</div>
	);
};

export default BottomAside;
