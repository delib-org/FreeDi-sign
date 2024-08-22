import { FC, useEffect, useState } from "react";
import styles from "./UserButtons.module.scss";
import Button from "../../../buttons/button/Button";
import { Signature, Statement } from "delib-npm";
import { setSignatureToDB } from "../../../../../controllers/db/sign/setSignature";
import CheckIcon from "../../../../../assets/icons/check.svg?react";
import { getSignature } from "../../../../../controllers/db/sign/getSignature";
import { useLanguage } from "../../../../../controllers/hooks/useLanguage";

interface Props {
  paragraphsLength: number;
  approved: number;
  document: Statement;
}

const UserButtons: FC<Props> = ({ paragraphsLength, approved, document }) => {
  const {t} = useLanguage();
  const [isChecked, setIsChecked] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [_signature, setSignature] = useState<Signature | undefined>(undefined);

  useEffect(() => {
    getSignature({ documentId: document.statementId }).then((signature) => {
      if (signature) {
        setSignature(signature);
        setIsChecked(signature.signed);
      }
    })
  }, []);

  useEffect(() => {
    const levelOfSignature = approved / paragraphsLength;
   
    if(_signature && _signature.levelOfSignature !== levelOfSignature) {
      setIsChecked(false);
    }
  }, [_signature, approved, paragraphsLength]);

  function handleReset() {
   
    setIsChecked(false);
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
        onClick={handleReset}
        backgroundColor="var(--reject)"
        unselectedBackgroundColor="rgb(223, 223, 223)"
        unselectedColor="black"
        isSelected={isRejected}
      >
        {isRejected && <CheckIcon />}
        </Button>
      <Button
        text={`${t("Confirm")} (${approved}/${paragraphsLength})`}
        onClick={handleSign}
        backgroundColor="var(--agree)"
        unselectedBackgroundColor="rgb(223, 223, 223)"
        unselectedColor="black"
        isSelected={isChecked}
      >
        {isChecked && <CheckIcon />}
      </Button>
    </div>
  );
};

export default UserButtons;
