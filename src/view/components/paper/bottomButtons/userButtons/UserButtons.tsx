import { FC, useEffect, useState } from "react";
import styles from "./UserButtons.module.scss";
import Button from "../../../buttons/button/Button";
import { Signature, Statement } from "delib-npm";
import { setSignatureToDB } from "../../../../../controllers/db/sign/setSignature";
import CheckIcon from "../../../../../assets/icons/check.svg?react";
import DisAgreeIcon from "../../../../../assets/icons/disApprove.svg?react";
import { getSignature } from "../../../../../controllers/db/sign/getSignature";
import { useLanguage } from "../../../../../controllers/hooks/useLanguage";
import { useSelector } from "react-redux";
import { selectApprovalsByDocId } from "../../../../../controllers/slices/approvalSlice";
import { setApprovalToDB } from "../../../../../controllers/db/approval/setApproval";
import { ButtonType } from "../../../../../model/enumsModel";

interface Props {
  paragraphsLength: number;
  approved: number;
  document: Statement;
}

const UserButtons: FC<Props> = ({ paragraphsLength, approved, document }) => {
  const approvals = useSelector(selectApprovalsByDocId(document.statementId));
  const { t } = useLanguage();
  const [isChecked, setIsChecked] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [_signature, setSignature] = useState<Signature | undefined>(undefined);

  useEffect(() => {
    getSignature({ documentId: document.statementId }).then((signature) => {
      if (signature) {
     
        setSignature(signature);
        setIsChecked(signature.signed);
        if (!signature.signed) setIsRejected(true);
      }
    });
  }, []);

  useEffect(() => {
    const levelOfSignature = approved / paragraphsLength;

    if (_signature && _signature.levelOfSignature !== levelOfSignature) {
      setIsChecked(false);
    }
  }, [_signature, approved, paragraphsLength]);

  function handleReject() {
    setIsChecked(false);
    setIsRejected(true);

    setSignatureToDB({
      document,
      paragraphsLength,
      approved,
      signed: false,
    }).then((isSigned) => {
      console.log("isSigned", isSigned);
      setIsRejected(true);
    });
  }

  function handleSign() {
    setIsRejected(false);
    setIsChecked(true);

    approvals.forEach(async (approval) => {
      await setApprovalToDB({
        statementId: approval.statementId,
        approval: approval.approval,
      });
    });

    setSignatureToDB({
      document,
      paragraphsLength,
      approved,
      signed: true,
    }).then((isSigned) => {
      console.log("isSigned", isSigned);
      setIsChecked(isSigned);
    });
  }

  return (
    <div className={styles.buttons}>
      <Button
        text={t("Disagree")}
        onClick={handleReject}
        buttonType={ButtonType.reject}
        isSelected={isRejected}
      >
        {isRejected && <DisAgreeIcon />}
      </Button>
      <Button  
        text={`${t("Confirm")} (${approved}/${paragraphsLength})`}
        onClick={handleSign}
        isSelected={isChecked}
        buttonType={ButtonType.approve}
      >
        {isChecked && <CheckIcon />}
      </Button>
    </div>
  );
};

export default UserButtons;
