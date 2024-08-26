import { doc, getDoc, setDoc } from "firebase/firestore";
import { DB } from "../config";
import { Approval, Collections, getStatementSubscriptionId, Statement } from "delib-npm";
import { store } from "../../../model/store";

export async function setApprovalToDB({ statementId, statement, approval }: { statementId?: string, statement?: Statement, approval: boolean }): Promise<void> {
    try {
        if (!statementId && !statement) throw new Error("Statement not found");

        const user = store.getState().user.user;
        if (!user) throw new Error("User not found");

        if (!statement && statementId) {
            const statementRef = doc(DB, Collections.statements, statementId);
            const statementDB = await getDoc(statementRef);
            if (!statementDB.exists()) throw new Error("Statement not found");
            statement = statementDB.data() as Statement;
        } else {
            throw new Error("Statement not found");
        }


        const approvalId = getStatementSubscriptionId(statement.statementId, user);
        if (!approvalId) throw new Error("Approval Id not found");

        const approvalRef = doc(DB, Collections.approval, approvalId);
        const documentId = statement.documentSettings?.parentDocumentId;
        if (!documentId) throw new Error("Document Id not found");



        const approvalData: Approval = {
            approvalId,
            approval,
            statementId: statement.statementId,
            userId: user.uid,
            documentId,
            topParentId: statement.topParentId
        }

        setDoc(approvalRef, approvalData);
    } catch (error) {
        console.error(error);
    }
}