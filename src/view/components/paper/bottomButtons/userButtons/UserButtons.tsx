import { FC, useEffect, useState } from "react";
import styles from "./UserButtons.module.scss";
import Button from "../../../buttons/button/Button";
import { Signature, SignatureType, Statement } from "delib-npm";
import { setSignatureToDB } from "../../../../../controllers/db/sign/setSignature";
import CheckIcon from "../../../../../assets/icons/check.svg?react";
import DisAgreeIcon from "../../../../../assets/icons/disApprove.svg?react";
import { useLanguage } from "../../../../../controllers/hooks/useLanguage";
import { useSelector } from "react-redux";
import { selectApprovalsByDocId } from "../../../../../controllers/slices/approvalSlice";
import { setApprovalToDB } from "../../../../../controllers/db/approval/setApproval";
import { ButtonType } from "../../../../../model/enumsModel";
import { mySignaturesSelector } from "../../../../../controllers/slices/statementsSlice";
import Popup from "../../../popup/Popup";
import { selectEvaluation } from "../../../../../controllers/slices/evaluationSlice";
import { useParams } from "react-router-dom";

interface Props {
  paragraphsLength: number;
  approved: number;
  document: Statement;
}

const UserButtons: FC<Props> = ({ paragraphsLength, approved, document }) => {
  const { statementId } = useParams();
  const approvals = useSelector(selectApprovalsByDocId(document.statementId));
  const mySignature: Signature | undefined = useSelector(
    mySignaturesSelector(document.statementId)
  );
  const approve = useSelector(selectEvaluation(statementId))?.approve;

  const { t } = useLanguage();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isRejected, setIsRejected] = useState<boolean>(false);

  useEffect(() => {
    if (!mySignature || mySignature.signed === SignatureType.viewed) {
      setIsChecked(false);
      setIsRejected(false);
    } else if (mySignature.signed === SignatureType.signed) {
      setIsChecked(true);
      setIsRejected(false);
    } else if (mySignature.signed === SignatureType.rejected) {
      setIsChecked(false);
      setIsRejected(true);
    }
  }, [mySignature]);

  function handleReject() {
    const newSignatureType = isRejected
      ? SignatureType.viewed
      : SignatureType.rejected;

    setIsChecked(false);
    setIsRejected(!isRejected);

    setSignatureToDB({
      document,
      paragraphsLength,
      approved,
      signed: newSignatureType,
    }).then(() => {
      setIsRejected(!isRejected);
    });
  }

  function handleSign() {
    setIsRejected(false);
    setIsChecked(!isChecked);

    approvals.forEach(async (approval) => {
      await setApprovalToDB({
        statementId: approval.statementId,
        approval: approval.approval,
      });
    });

    const newSignatureType = isChecked
      ? SignatureType.viewed
      : SignatureType.signed;

    setSignatureToDB({
      document,
      paragraphsLength,
      approved,
      signed: newSignatureType,
    }).then((isSigned) => {
      if (isSigned) setIsChecked(!isChecked);
    });
  }

  const approveText = approve
    ? `${t("Confirm")} (${approved}/${paragraphsLength})`
    : t("Confirm");

  if (!approve) return null;

  return (
    <div className={styles.buttons}>
      <Popup statementId={document.statementId} />
      <div className={styles.buttonsBox}>
        <Button
          text={t("Disagree")}
          onClick={handleReject}
          buttonType={ButtonType.reject}
          fontWight="bold"
          unselectedColor="var(--home)"
          unselectedBackgroundColor="white"
          unselectedBorderColor="var(--home)"
          isSelected={isRejected}
        >
          {isRejected && <DisAgreeIcon />}
        </Button>
        <Button
          text={approveText}
          onClick={handleSign}
          isSelected={isChecked}
          fontWight="bold"
          unselectedColor="var(--home)"
          unselectedBackgroundColor="white"
          unselectedBorderColor="var(--home)"
          buttonType={ButtonType.approve}
        >
          {isChecked && <CheckIcon />}
        </Button>
      </div>
    </div>
  );
};

export default UserButtons;
