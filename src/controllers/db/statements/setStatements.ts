import { Collections, Statement } from "delib-npm";
import { doc, updateDoc } from "firebase/firestore";
import { DB } from "../config";
interface StatementTextProps {
    statement: Statement;
    title?: string;
    description?: string;
}


export function updateStatementText({ statement, title, description }: StatementTextProps) {
    try {
        const statementRef = doc(DB, Collections.statements, statement.statementId);
        const newTitle = title ? title : statement.statement;
        const newDescription = description ? description : statement.description||"";
        updateDoc(statementRef, { statement: newTitle, description: newDescription });
    } catch (error) {
        console.error(error);
    }
}