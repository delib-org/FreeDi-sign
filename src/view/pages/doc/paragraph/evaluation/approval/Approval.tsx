import {
  Approval,
  getStatementSubscriptionId,
  Role,
  Statement,
} from "delib-npm";
import { FC, useEffect, useContext } from "react";
import styles from "./Approval.module.scss";
//icons

import ApproveWhite from "../../../../../../assets/icons/approveWhite.svg?react";
import RejectWhite from "../../../../../../assets/icons/rejectWhite.svg?react";
import { setApprovalToDB } from "../../../../../../controllers/db/approval/setApproval";
import { getUserApprovalFromDB } from "../../../../../../controllers/db/approval/getApproval";
import { RoleContext } from "../../../Document";
import { useDispatch, useSelector } from "react-redux";
import {
  selectApprovalById,
  setApproval,
  updateApproval,
} from "../../../../../../controllers/slices/approvalSlice";
import { store } from "../../../../../../model/store";

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

    useEffect(() => {
      getUserApprovalFromDB({ statement })
        .then((approval: Approval | undefined) => {
          try {
            if (approval) {
              dispatch(setApproval(approval));
            } else {
              const user = store.getState().user.user;
              if (!user) throw new Error("User not found");
              const documentId = statement.documentSettings?.parentDocumentId;
              if (!documentId) throw new Error("Document Id not found");
              const approvalId = getStatementSubscriptionId(
                statement.statementId,
                user
              );
              if (!approvalId) throw new Error("Approve Id not found");

              const newApproval: Approval = {
                approvalId,
                statementId: statement.statementId,
                topParentId: statement.topParentId,
                userId: user.uid,
                approval: true,
                documentId,
              };

              dispatch(setApproval(newApproval));
            }
          } catch (error) {
            console.error(error);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    function handleApprove(_approval: boolean) {
      try {
        if (role === Role.admin) return;
        setApprovalToDB({ statement, approval: _approval });
        dispatch(
          updateApproval({
            approved: _approval,
            statementId: statement.statementId,
          })
        );
      } catch (error) {
        console.error(error);
      }
    }

    const stApproved = statement.documentApproval?.approved || 0;
    const stRejected =
      (statement.documentApproval?.totalVoters || stApproved) - stApproved || 0;

    return (
      <div className={styles.admin}>
        {role === Role.admin && stApproved}
        <div
          onClick={() => handleApprove(true)}
          className={`${styles["admin__approve"]} ${
            styles[
              approved || role === Role.admin
                ? "admin__approve--approve"
                : "admin__approve--unselected"
            ]
          }`}
        >
          <ApproveWhite />
        </div>
        <div
          onClick={() => handleApprove(false)}
          className={`${styles["admin__approve"]} ${
            styles[
              !approved || role === Role.admin
                ? "admin__approve--reject"
                : "admin__approve--unselected"
            ]
          }`}
        >
          <RejectWhite />
        </div>
        {role === Role.admin && stRejected}
      </div>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default ApprovalComp;
