import { NavLink, useSearchParams } from "react-router-dom";
import { useLanguage } from "../../../../controllers/hooks/useLanguage"
import LogoAndNameIcon from "../../../components/icons/LogoAndNameIcon"
import styles from './AsideLogo.module.scss'

const AsideLogo = () => {
    const {dir, t} = useLanguage();
    const [searchParams] = useSearchParams();
    const lobby = searchParams.get("lobby");
    
    if(lobby) {
        return (
            <NavLink to={`/lobby/${lobby}`} className={styles["lobby-logo"]}>
                שיתוף ציבור - מועצה אזורית גולן
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