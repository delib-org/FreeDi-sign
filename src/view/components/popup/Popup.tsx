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
import { SignatureType } from "delib-npm";

interface Props {
  statementId: string;
}
const Popup: FC<Props> = ({ statementId }) => {
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const signatureUpdate = useSelector(mySignatureUpdateSelector(statementId));
 
  const showPopup =
    signatureUpdate &&
    (signatureUpdate.signed === SignatureType.signed ||
      signatureUpdate.signed === SignatureType.rejected);
  if (!showPopup) return null;

  function handleHidePopup() {
    dispatch(setMySignatureUpdate({ statementId, signed:undefined}));
  }

  const popupBackground = (() => {
    if (signatureUpdate.signed === SignatureType.signed) {
      return styles["popup--approve"];
    } else if (signatureUpdate.signed === SignatureType.rejected) {
      return styles["popup--reject"];
    } else {
      return styles["popup--view"];
    }
  })();

  const word = (() => {
    if (signatureUpdate.signed === SignatureType.signed) {
      return "signature";
    } else if (signatureUpdate.signed === SignatureType.rejected) {
      return "rejection";
    } else {
      return "view";
    }
  })();

  return (
    <div
      className={`${styles.popup} ${popupBackground}`}
      onClick={handleHidePopup}
    >
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
