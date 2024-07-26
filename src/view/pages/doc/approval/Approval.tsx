import { Approval, Statement } from "delib-npm";
import { FC, useState, useEffect } from "react";
import styles from "./Approval.module.scss";
//icons
import Approve from "../../../../assets/icons/approve.svg?react";
import Reject from "../../../../assets/icons/reject.svg?react";
import { setApprovalToDB } from "../../../../controllers/db/approval/setApproval";
import { getUserApprovalFromDB } from "../../../../controllers/db/approval/getApproval";

interface Props {
  statement: Statement;
  docStatement: Statement;
}

const ApprovalComp: FC<Props> = ({ statement, docStatement }) => {
  try {
    const [approved, setApproved] = useState<boolean>(true);

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

    return approved ? (
      <button
        onClick={handleApproval}
        className={`${styles.button} ${styles.approve}`}
      >
        Approve <Approve />
      </button>
    ) : (
      <button
        onClick={handleApproval}
        className={`${styles.button} ${styles.reject}`}
      >
        Reject <Reject />
      </button>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default ApprovalComp;
