import { FC } from "react";
import styles from "./Popup.module.scss";
import {
  mySignatureUpdateSelector,
  setMySignatureUpdate,
} from "../../../controllers/slices/statementsSlice";
import { useDispatch, useSelector } from "react-redux";

//icons
import CloseIcon from "../../../assets/icons/close.svg?react";
import { useLanguage } from "../../../controllers/hooks/useLanguage";

interface Props {
  statementId: string;
}
const Popup: FC<Props> = ({ statementId }) => {
  const dispatch = useDispatch();
  const {t} = useLanguage();
  const signatureUpdate = useSelector(mySignatureUpdateSelector(statementId));
  const showPopup = signatureUpdate && signatureUpdate.signed !== undefined;
  if (!showPopup) return null;

  function handleHidePopup() {
    dispatch(setMySignatureUpdate({ statementId, signed: undefined }));
  }

  const popupBackground = signatureUpdate.signed
    ? styles["popup--approve"]
    : styles["popup--reject"];

  const word = signatureUpdate.signed ? "signature" : "rejection";

  return (
    <div className={`${styles.popup} ${popupBackground}`} onClick={handleHidePopup}>
     
      <div className={styles["popup-content"]}>
        <p>{t("Thank you")}!</p>
        <p>{t(`Your ${word} has been sent`)}</p>
      </div>
      <button className={styles.close}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default Popup;
