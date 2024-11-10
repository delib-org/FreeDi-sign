import { FC } from "react";
import styles from "./Popup.module.scss";
import { mySignatureUpdateSelector, setMySignatureUpdate } from "../../../controllers/slices/statementsSlice";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  statementId: string;
}
const Popup: FC<Props> = ({ statementId }) => {
  const dispatch = useDispatch();
  const signatureUpdate = useSelector(mySignatureUpdateSelector(statementId));
  const showPopup = signatureUpdate && signatureUpdate.signed !== undefined;
  if (!showPopup) return null;

  function handleHidePopup() {
    dispatch(setMySignatureUpdate({ statementId, signed: undefined }));
  }

  const popupBackground = signatureUpdate.signed ? styles["popup--approve"] : styles["popup--reject"];

  return (
    <div className={`${styles.popup} ${popupBackground}`}>
      <div>
        <div className={styles["popup-content"]}>
          <button className="close" onClick={handleHidePopup}>
            &times;
          </button>
          <p>This is a pop-up message!</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
