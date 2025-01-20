import { useLanguage } from "../../../../controllers/hooks/useLanguage"
import LogoAndNameIcon from "../../../components/icons/LogoAndNameIcon"
import styles from './AsideLogo.module.scss'

const AsideLogo = () => {
    const {dir, t} = useLanguage()
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