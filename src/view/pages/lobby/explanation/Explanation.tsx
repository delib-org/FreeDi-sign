import { useLanguage } from "../../../../controllers/hooks/useLanguage";
import ExplainButton from "./explainButton/ExplainButton";
import styles from "./Explanation.module.scss";

const Explanation = () => {
    const { t } = useLanguage();


    return (
        <div className={styles.explanation}>
            <p>{t("Welcome")}</p>
            <p>{t("How to help Improve these documents")}</p>
            <div className="btns">
                <ExplainButton />
            </div>
        </div>
    )
}

export default Explanation