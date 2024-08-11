import { Collections } from "delib-npm";
import { doc, updateDoc } from "firebase/firestore";
import { DB } from "../config";

export function updateStatementText(statementId: string, text: string) {
    try {
        const statementRef = doc(DB, Collections.statements, statementId);
        updateDoc(statementRef, { statement: text });
    } catch (error) {
        console.error(error);
    }
}