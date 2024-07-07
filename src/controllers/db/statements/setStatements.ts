import { Collections } from "delib-npm";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { DB } from "../config";
import { newStatement } from "../../general.ts/statement_helpers";

export async function setDocumentStatement(statement: string, statementId: string, order: number) {
    try {
        const parentStatementRef = doc(DB, Collections.statements, statementId);
        const parentStatementDB = await getDoc(parentStatementRef);
        if (!parentStatementDB.exists()) throw new Error("Parent statement does not exist");



        //create statement
        const newDocumentStatement = newStatement({
            order,
            statement,
            parentId: statementId,
            topParentId: parentStatementDB.data().topParentId,
            parentDocumentId: "top"
        });

        if (!newDocumentStatement) throw new Error("Error creating statement");
        const newDocumentStatementRef = doc(DB, Collections.statements, newDocumentStatement.statementId);
        await setDoc(newDocumentStatementRef, newDocumentStatement);

    } catch (error) {
        console.error(error)
    }
}