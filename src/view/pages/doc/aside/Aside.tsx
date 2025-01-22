import styles from "./Aside.module.scss";
import HomeIcon from "../../../../assets/icons/home.svg?react";
import {
  useLanguage,
} from "../../../../controllers/hooks/useLanguage";

//icons
// import USAFlag from "../../../../assets/icons/usaFlag.svg?react";
// import IsraelFlag from "../../../../assets/icons/israelFlag.svg?react";
import TOC from "../toc/TableOfContent";


import BottomAside from "./bottomAside/BottomAside";
import AsideLogo from "./AsideLogo";
import { NavLink, useSearchParams } from "react-router-dom";

function Aside() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const lobby = searchParams.get("lobby");

  // function handleToggleLanguage() {
  //   if (currentLanguage === LanguagesEnum.he) changeLanguage(LanguagesEnum.en);
  //   else changeLanguage(LanguagesEnum.he);
  // }

  return (
    <aside className={styles.aside} style={{ gridTemplateRows: lobby ? "30px 6rem 1fr" : "6rem 1fr"}}>
      {lobby && <NavLink to={`/lobby/${lobby}`} className={styles.homeButton}>
        <HomeIcon />
      </NavLink>}
      <AsideLogo />
      <TOC isAside={true} />
      
     
      <BottomAside />
      <div className={styles.ddi}>
        {/* <button className={styles.button} onClick={handleToggleLanguage}>
          {currentLanguage === LanguagesEnum.en ? <IsraelFlag /> : <USAFlag />}
        </button> */}
        <a href="https://delib.org" target="_blank">
          {t("From the Deliberative Democracy Institute")}
        </a>
      </div>
    </aside>
  );
}

export default Aside;
