import { AgreeDisagree, Collections, getStatementSubscriptionId, Statement } from "delib-npm";
import { store } from "../../../model/store";
import { doc, setDoc } from "firebase/firestore";
import { firebaseDb } from "../config";

export function setAgreesToDB({ statement, agree }: { statement: Statement, agree: number }): void {
    try {
        const user = store.getState().user.user;
        if (!user) throw new Error("User not found");
        const agreeId = getStatementSubscriptionId(statement.statementId, user);
        if (!agreeId) throw new Error("Agree Id not found");

        const agreeRef = doc(firebaseDb, Collections.agrees, agreeId);
     
        const documentId = statement.documentSettings?.parentDocumentId;
        if(!documentId) throw new Error("Document Id not found");

        const agreeData: AgreeDisagree = {
            agreeId,
            agree,
            statementId: statement.statementId,
            userId: user.uid,
            documentId,
            topParentId: statement.topParentId
        }

        setDoc(agreeRef, agreeData);
    } catch (error) {
        console.error(error);
    }
}