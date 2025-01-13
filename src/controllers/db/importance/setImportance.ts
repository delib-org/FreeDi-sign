import { doc, setDoc } from "firebase/firestore";
import { firebaseDb } from "../config";
import { Collections, getStatementSubscriptionId, Importance, ImportanceSchema, Statement } from "delib-npm";
import { store } from "../../../model/store";

export async function setImportanceToDB({ statement, importance }: { statement: Statement,  importance: number }): Promise<void> {
    try {
        const user = store.getState().user.user;
        if (!user) throw new Error("User not logged in");
        const importanceId = getStatementSubscriptionId(statement.statementId, user);
        if(!importanceId) throw new Error("ImportanceId not found");
        const importanceRef = doc(firebaseDb, Collections.importance, importanceId);

        const userId = user.uid;

        if(!statement.documentSettings?.parentDocumentId) throw new Error("Parent Document Id not found");

        const importanceObj: Importance = {
            importance,
            statementId: statement.statementId,
            parentId: statement.parentId,
            documentId: statement.documentSettings?.parentDocumentId,
            userId,
            topParentId: statement.topParentId
        }

        ImportanceSchema.parse(importanceObj);


        await setDoc(importanceRef, importanceObj, { merge: true });
    } catch (e) {
        console.error(e);
    }
}