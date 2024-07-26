import { doc, setDoc } from "firebase/firestore";
import { DB } from "../config";
import { Approval, Collections, getStatementSubscriptionId, Statement } from "delib-npm";
import { store } from "../../../model/store";

export function setApprovalToDB({ docStatement, statement, approval }: { docStatement: Statement, statement: Statement, approval: boolean }): void {
    try {
        const user = store.getState().user.user;
        if (!user) throw new Error("User not found");
        const approvalId = getStatementSubscriptionId(statement.statementId, user);
        if (!approvalId) throw new Error("Approval Id not found");

        const approvalRef = doc(DB, Collections.approval, approvalId);

        const approvalData: Approval = {
            approvalId,
            approval,
            statementId: statement.statementId,
            userId: user.uid,
            documentId: docStatement.statementId,
            topParentId: statement.topParentId
        }

        setDoc(approvalRef, approvalData);
    } catch (error) {
        console.error(error);
    }
}