import { Collections } from "delib-npm";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { DB } from "../config";
import { newStatement } from "../../general.ts/statement_helpers";

interface SetDocumentStatement {
    statement: string;
    statementId: string;
    order: number;
    sectionId?: string;
    parentSectionId?: string;
}
export async function setDocumentStatement({statement, statementId, order, sectionId,parentSectionId}: SetDocumentStatement): Promise<void> {
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
            parentDocumentId: statementId,
            sectionId,
            parentSectionId: parentSectionId || "top"
        });

        if (!newDocumentStatement) throw new Error("Error creating statement");
        const newDocumentStatementRef = doc(DB, Collections.statements, newDocumentStatement.statementId);
        await setDoc(newDocumentStatementRef, newDocumentStatement);

    } catch (error) {
        console.error(error)
    }
}