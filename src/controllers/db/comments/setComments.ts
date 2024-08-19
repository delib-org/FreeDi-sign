import { Collections, DocumentType, Statement } from "delib-npm";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { DB } from "../config";
import { store } from "../../../model/store";
import { createNewStatement } from "../../general.ts/statement_helpers";

interface EditCommentProps {
    statement: Statement;
    newText?: string;
}

export function addCommentToDB({
    text,
    parentStatement,
    order = 0 }:
    {
        text: string,
        parentStatement: Statement,
        order: number
    }): void {
    try {

        const user = store.getState().user.user;
        if (!user) throw new Error("User not found");

           
        const newStatement: Statement | undefined = createNewStatement({
            text,
            statement: parentStatement,
            order,
            type: DocumentType.comment,
            isTop: false
        });
        if(!newStatement) throw new Error("Error creating new comment");
        const { statementId } = newStatement;

        const statementRef = doc(DB, Collections.statements, statementId);
        setDoc(statementRef, newStatement, { merge: true });

    } catch (error) {
        console.error(error);
    }
}

export function editComment({ statement, newText }: EditCommentProps): void {
    try {
        const statementRef = doc(DB, Collections.statements, statement.statementId);
        updateDoc(statementRef, {
            statement: newText
        });
    } catch (error) {
        console.error(error);
    }
}