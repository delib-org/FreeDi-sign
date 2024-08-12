import { Approval, Statement } from "delib-npm";
import { FC, useState, useEffect, useRef } from "react";
import styles from "./Approval.module.scss";
//icons
import Approve from "../../../../../../assets/icons/approve.svg?react";
import ApproveWhite from "../../../../../../assets/icons/approveWhite.svg?react";
import RejectWhite from "../../../../../../assets/icons/rejectWhite.svg?react";
import { setApprovalToDB } from "../../../../../../controllers/db/approval/setApproval";
import { getUserApprovalFromDB } from "../../../../../../controllers/db/approval/getApproval";


interface Props {
  statement: Statement;
}

const ApprovalComp: FC<Props> = ({ statement }) => {
  try {
 
  

    const [approved, setApproved] = useState<boolean | undefined>(true);
    const [showApproval, setShowApproval] = useState<boolean>(false);
    const [close, setClose] = useState<boolean>(false);

    const approvedRef = useRef(null);

    useEffect(() => {
      getUserApprovalFromDB({ statement })
        .then((approval: Approval | undefined) => {
          if (approval) {
            setApproved(approval.approval);
          } else {
            setApproved(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    useEffect(() => {
      if (showApproval) {
        setClose(false);
      }
    }, [showApproval]);

    function handleApprove(approval: boolean) {
      try {

        setApprovalToDB({ statement, approval });
        setApproved(approval);
        setShowApproval(false);
      } catch (error) {
        console.error(error);
      }
    }

    if (approved === undefined && !showApproval)
      return (
        <div className={styles.nonActive} onClick={() => setShowApproval(true)}>
          <Approve />
        </div>
      );

    return showApproval ? (
      <div className={styles.appButton}>
        <div className={styles.appButtonBase}></div>
        <div
          className={styles.appButtonApprove}
          onClick={() => handleApprove(true)}
          style={{
            left: close ? "0px" : "-30px",
            bottom: close ? "0px" : "-30px",
            transition: "left 0.5s, bottom 0.5s",
          }}
          ref={approvedRef}
        >
          <ApproveWhite  />
        </div>
        <div
          className={styles.appButtonReject}
          onClick={() => handleApprove(false)}
          style={{
            left: close ? "0px" : "-30px",
            bottom: close ? "0px" : "-30px",
            transition: "left 0.5s, bottom 0.5s",
          }}
        >
          <RejectWhite />
        </div>
      </div>
    ) : (
      <div
        className={styles.selected}
        style={{
          backgroundColor: approved ? "var(--agree)" : "var(--reject)",
          transition: "background-color 0.5s",
        }}
        onClick={() => setShowApproval(true)}
      >
        {approved ? <ApproveWhite /> : <RejectWhite />}
      </div>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default ApprovalComp;
