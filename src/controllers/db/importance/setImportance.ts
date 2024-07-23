import { doc, setDoc } from "firebase/firestore";
import { DB } from "../config";
import { Collections, getStatementSubscriptionId, Importance, ImportanceSchema, Statement } from "delib-npm";
import { store } from "../../../model/store";

export async function setImportanceToDB({ statement, importance, document }: { statement: Statement, document: Statement, importance: number }): Promise<void> {
    try {
        const user = store.getState().user.user;
        if (!user) throw new Error("User not logged in");
        const importanceId = getStatementSubscriptionId(statement.statementId, user);
        if(!importanceId) throw new Error("ImportanceId not found");
        const importanceRef = doc(DB, Collections.importance, importanceId);

        const userId = user.uid;

        const importanceObj: Importance = {
            importance,
            statementId: statement.statementId,
            parentId: statement.parentId,
            documentId: document.statementId,
            userId,
            topParentId: statement.topParentId || document.statementId
        }

        ImportanceSchema.parse(importanceObj);


        await setDoc(importanceRef, importanceObj, { merge: true });
    } catch (e) {
        console.error(e);
    }
}