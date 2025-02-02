import { NavLink, useSearchParams } from "react-router-dom";
import { useLanguage } from "../../../../controllers/hooks/useLanguage"
import LogoAndNameIcon from "../../../components/icons/LogoAndNameIcon"
import styles from './AsideLogo.module.scss'
import { useDocument } from "../../../../controllers/hooks/documentHooks";

const AsideLogo = () => {
    const { dir, t } = useLanguage();
    const [searchParams] = useSearchParams();
    const lobby = searchParams.get("lobby");
    const {statement} = useDocument();


    if (lobby) {
        return (
            <NavLink to={`/lobby/${lobby}`} className={`${styles.logoText} ${dir === "rtl" ? styles["logo--rtl"] : null}`} >
                {statement?.statement ?? "חזרה ללובי"}
            </NavLink>
        )
    }

    return (
        <a
            href="https://freedi.co" target="_blank" rel="noreferrer"
            className={`${styles.logo} ${dir === "rtl" ? styles["logo--rtl"] : null
                }`}
        >
            <LogoAndNameIcon />
            <div className={styles.slogan}>{t("Fostering Collaboration")}</div>
        </a>
    )
}

export default AsideLogo