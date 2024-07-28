import { Approval, Statement } from "delib-npm";
import { FC, useState, useEffect } from "react";
import styles from "./Approval.module.scss";
//icons
import Approve from "../../../../assets/icons/approve.svg?react";
import ApproveWhite from "../../../../assets/icons/approveWhite.svg?react";
import Reject from "../../../../assets/icons/reject.svg?react";
import RejectWhite from "../../../../assets/icons/rejectWhite.svg?react";
import { setApprovalToDB } from "../../../../controllers/db/approval/setApproval";
import { getUserApprovalFromDB } from "../../../../controllers/db/approval/getApproval";

interface Props {
  statement: Statement;
  docStatement: Statement;
}

const ApprovalComp: FC<Props> = ({ statement, docStatement }) => {
  try {
    const [approved, setApproved] = useState<boolean | undefined>(undefined);
    const [showApproval, setShowApproval] = useState<boolean>(false);

    useEffect(() => {
      getUserApprovalFromDB({ statement })
        .then((approval: Approval | undefined) => {
          if (approval) {
            setApproved(approval.approval);
          } else {
            setApproved(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    function handleApproval() {
      setApprovalToDB({ docStatement, statement, approval: !approved });
      setApproved(!approved);
    }

    function handleApprove(approval: boolean) {
      setApprovalToDB({ docStatement, statement, approval });
      setApproved(approval);
      setShowApproval(false);
    }

    if (approved === undefined)
      return (
        <div className={styles.nonActive} onClick={() => setShowApproval(true)}>
          <Approve />
        </div>
      );

    return showApproval ? (
      <div className={styles.appButton}>
        <div className={styles.appButtonBase}>
          <Approve />
        </div>
        <div
          className={styles.appButtonApprove}
          onClick={() => handleApprove(true)}
        >
          <ApproveWhite />
        </div>
        <div
          className={styles.appButtonReject}
          onClick={() => handleApprove(false)}
        >
          <RejectWhite />
        </div>
      </div>
    ) : (
      <div className={styles.nonActive} onClick={() => setShowApproval(true)} >
       {approved? <ApproveWhite />: <RejectWhite />}
      </div>
    );

   
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default ApprovalComp;
