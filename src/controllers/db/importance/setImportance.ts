import { doc, setDoc } from "firebase/firestore";
import { DB } from "../config";
import { Collections, Importance, ImportanceSchema, Statement } from "delib-npm";
import { store } from "../../../model/store";

export async function setImportanceToDB({ statement, importance, document }: { statement: Statement, document: Statement, importance: number }): void {
    try {
        const statementRef = doc(DB, Collections.importance, statement.statementId);

        const userId = store.getState().user.user?.uid;
        if (!userId) throw new Error("User not logged in");

        const importanceObj: Importance = {
            importance,
            statementId: statement.statementId,
            parentId: statement.parentId,
            documentId: document.statementId,
            userId,
            topParentId: statement.topParentId || document.statementId
        }

        ImportanceSchema.parse(importanceObj);

        await setDoc(statementRef, importanceObj, { merge: true });
    } catch (e) {
        console.error(e);
    }
}