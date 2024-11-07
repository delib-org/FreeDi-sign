import { FC, useState } from "react";
import styles from "./Popup.module.scss";

interface Props{
    setShowPopup: (show:boolean) => void;
}
const Popup: FC<Props> = ({setShowPopup}) => {
 



  return (
    <div className={styles.popup}>
      <div>
        <div className={styles["popup-content"]}>
          <button className="close" onClick={()=>setShowPopup(false)}>
            &times;
          </button>
          <p>This is a pop-up message!</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
