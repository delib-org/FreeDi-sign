import { Approval, Role, Statement } from "delib-npm";
import { FC, useState, useEffect, useRef, useContext } from "react";
import styles from "./Approval.module.scss";
//icons
import Approve from "../../../../../../assets/icons/approve.svg?react";
import ApproveWhite from "../../../../../../assets/icons/approveWhite.svg?react";
import RejectWhite from "../../../../../../assets/icons/rejectWhite.svg?react";
import { setApprovalToDB } from "../../../../../../controllers/db/approval/setApproval";
import { getUserApprovalFromDB } from "../../../../../../controllers/db/approval/getApproval";
import { RoleContext } from "../../../Document";
import { useDispatch, useSelector } from "react-redux";
import {
  selectApprovalById,
  setApproval,
} from "../../../../../../controllers/slices/approvalSlice";

interface Props {
  statement: Statement;
}

const ApprovalComp: FC<Props> = ({ statement }) => {
  try {
    const role = useContext(RoleContext);
    const dispatch = useDispatch();

    const approval: Approval | undefined = useSelector(
      selectApprovalById(statement.statementId)
    );
    const approved = approval ? approval.approval : true;
    // const [approved, setApproved] = useState<boolean | undefined>(approval?approval.approval:true);
    const [showApproval, setShowApproval] = useState<boolean>(false);
    const [close, setClose] = useState<boolean>(false);

    const approvedRef = useRef(null);

    useEffect(() => {
      getUserApprovalFromDB({ statement })
        .then((approval: Approval | undefined) => {
          if (approval) {
            dispatch(setApproval(approval));
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

    function handleApprove(_approval: boolean) {
      try {
        const __approval: Approval = {
          statementId: approval?.statementId ?? "",
          topParentId: approval?.topParentId ?? "",
          userId: approval?.userId ?? "",
          approval: approval?.approval ?? false,
          documentId: approval?.documentId ?? "",
          approvalId: approval?.approvalId ?? "",
        };
        if (!__approval.approvalId) throw new Error("Approval not found");
        setApprovalToDB({ statement, approval: _approval });
        dispatch(setApproval(__approval));
        setShowApproval(false);
      } catch (error) {
        console.error(error);
      }
    }

    if (role === Role.admin) {
      const approved = statement.documentApproval?.approved || 0;
      const rejected =
        (statement.documentApproval?.totalVoters || approved) - approved || 0;
      return (
        <div className={styles.admin}>
          {approved}
          <div
            className={`${styles["admin__approve"]} ${styles["admin__approve--approve"]}`}
          >
            <ApproveWhite />
          </div>
          <div
            className={`${styles["admin__approve"]} ${styles["admin__approve--reject"]}`}
          >
            <RejectWhite />
          </div>
          {rejected}
        </div>
      );
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
          <ApproveWhite />
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
