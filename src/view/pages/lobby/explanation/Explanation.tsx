import { useLanguage } from "../../../../controllers/hooks/useLanguage";
import styles from "./Explanation.module.scss";
import Ranking from '../../../../assets/images/ranking.png'
import Suggestion from '../../../../assets/images/suggestions.png';

const Explanation = () => {
    const { t } = useLanguage();
    return (
        <div className={styles.explanation}>
            <p>{t("Welcome")}</p>
            <p>{t("How to help Improve these documents")}</p>
            <div className={styles['btns']}>

                <div className={styles.img} >
                    <div style={{ backgroundImage: `url(${Suggestion})` }}>
                    </div>
                </div>
                <div className={styles.img} >
                    <div style={{ backgroundImage: `url(${Ranking})` }}>
                    </div>
                </div>
                <span> {t("Suggest Improvements")}</span>
                <span>{t("Ranking")}</span>              
               

            </div>
        </div>
    )
}

export default Explanation