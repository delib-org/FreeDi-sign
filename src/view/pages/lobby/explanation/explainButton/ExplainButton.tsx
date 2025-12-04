import { useLanguage } from '../../../../../controllers/hooks/useLanguage';
import Suggestion from '../../../../../assets/images/suggestions.png';
import { useLobby } from '../../LobbyContext';
import styles from './ExplainButton.module.scss';

const ExplainButton = () => {
    const { t } = useLanguage();
    const { setShowExplanation } = useLobby();
    return (


        <button
            onClick={() => {
                setShowExplanation(true);

            }}
            className={styles['explain-button']}
            aria-label="Explain Suggest Improvements"
        >
            <div className={styles.img} style={{ backgroundImage: `url(${Suggestion})` }}>
            </div>
            <span> {t("Suggest Improvements")}</span>
        </button>


    )
}

export default ExplainButton