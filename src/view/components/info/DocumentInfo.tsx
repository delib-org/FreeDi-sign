import { DocumentSigns, Statement } from "delib-npm";
import { FC } from "react";
import styles from "./DocumentInfo.module.scss";
import Button from "../buttons/button/Button";
import { useLanguage } from "../../../controllers/hooks/useLanguage";


interface Props {
  statement: Statement | undefined;
  signatures?: DocumentSigns;
  setShowInfo: (showInfo: boolean) => void;
}

const DocumentInfo: FC<Props> = ({ statement, signatures, setShowInfo }) => {
  const { t } = useLanguage();
  if (!statement) return null;
  if (!signatures) return <div>
    Information Is not available yet
    <Button
          text={t("Close")}
          onClick={() => {
            setShowInfo(false);
          }}
        ></Button>
  </div>;
  return (
    <div className={styles.info}>
      <h4 className={styles.title}>{t("Signatures Information")}</h4>

      <p>{t("Approved")}: {signatures.signed || 0} </p>
      <p>{t("Rejected")}: {signatures.rejected || 0} </p>
      <p>{t("Consent Average")}: {((signatures.avgSignatures || 0)*100).toFixed(1) || 0}% </p>
      <div className={styles.btns}>
      <Button
          text={t("Close")}
          onClick={() => {
            setShowInfo(false);
          }}
        ></Button>
      </div>
    </div>
  );
};

export default DocumentInfo;
