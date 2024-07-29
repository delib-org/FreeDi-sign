import { Collections, DocumentType, Statement, StatementType } from "delib-npm";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { DB } from "../config";
import { store } from "../../../model/store";

interface EditCommentProps {
    statement: Statement;
    newText?: string;
}

export function addCommentToDB({
    text,
    parentStatement,
    paragraphStatement,
    docStatement,
    order = 0 }:
    {
        text: string,
        parentStatement: Statement,
        paragraphStatement: Statement,
        docStatement: Statement,
        order: number
    }): void {
    try {

        const user = store.getState().user.user;
        if (!user) throw new Error("User not found");

        const statementId = crypto.randomUUID();
        console.log("statementId", statementId);
        const statementRef = doc(DB, Collections.statements, statementId);
        const newStatement: Statement = {
            statementId,
            statement: text,
            topParentId: paragraphStatement.topParentId,
            parentId: parentStatement.statementId,
            consensus: 0,
            creator: user,
            creatorId: user.uid,
            createdAt: new Date().getTime(),
            lastUpdate: new Date().getTime(),
            statementType: StatementType.document,
            documentSettings: {
                type: DocumentType.comment,
                parentDocumentId: docStatement.statementId,
                order,
                isTop:false

            }
        };
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