import styles from "./Aside.module.scss";
import {
  useLanguage,
} from "../../../../controllers/hooks/useLanguage";

import TOC from "../toc/TableOfContent";


import BottomAside from "./bottomAside/BottomAside";
import AsideLogo from "./AsideLogo";

function Aside() {
  const { t } = useLanguage();
 

  return (
    <aside className={styles.aside} >
     
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
