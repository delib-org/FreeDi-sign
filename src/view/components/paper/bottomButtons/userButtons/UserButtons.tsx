import { FC, useEffect, useState } from "react";
import styles from "./UserButtons.module.scss";
import Button from "../../../buttons/button/Button";
import { Signature, Statement } from "delib-npm";
import { setSignatureToDB } from "../../../../../controllers/db/sign/setSignature";
import CheckIcon from "../../../../../assets/icons/check.svg?react";
import DisAgreeIcon from "../../../../../assets/icons/disApprove.svg?react";
import { useLanguage } from "../../../../../controllers/hooks/useLanguage";
import { useSelector } from "react-redux";
import { selectApprovalsByDocId } from "../../../../../controllers/slices/approvalSlice";
import { setApprovalToDB } from "../../../../../controllers/db/approval/setApproval";
import { ButtonType } from "../../../../../model/enumsModel";
import { mySignaturesSelector } from "../../../../../controllers/slices/statementsSlice";

interface Props {
  paragraphsLength: number;
  approved: number;
  document: Statement;
}

const UserButtons: FC<Props> = ({ paragraphsLength, approved, document }) => {
  const approvals = useSelector(selectApprovalsByDocId(document.statementId));
  const mySignature: Signature|undefined = useSelector(
    mySignaturesSelector(document.statementId)
  );
  console.log("mySignature", mySignature);
  const { t } = useLanguage();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isRejected, setIsRejected] = useState<boolean>(false);

  useEffect(() => {
    if (!mySignature) {
      setIsChecked(false);
      setIsRejected(false);
    } else if (mySignature.signed) {
      setIsChecked(true);
      setIsRejected(false);
    } else if (mySignature.signed === false) {
      setIsChecked(false);
      setIsRejected(true);
    }
  }, [mySignature]);

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
        fontWight="bold"
        unselectedColor="var(--home)"
        unselectedBackgroundColor="white"
        unselectedBorderColor="var(--home)"
        isSelected={isRejected}
      >
        {isRejected && <DisAgreeIcon />}
      </Button>
      <Button
        text={`${t("Confirm")} (${approved}/${paragraphsLength})`}
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
  );
};

export default UserButtons;
