import { Collections } from "delib-npm";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { DB } from "../config";
import { newSection } from "../../general.ts/statement_helpers";

interface SetDocumentStatement {
    statement: string;
    statementId: string;
    order: number;
    parentSectionId?: string;
}
export async function setDocumentStatement({statement, statementId, order,parentSectionId}: SetDocumentStatement): Promise<void> {
    try {
        const parentStatementRef = doc(DB, Collections.statements, statementId);
        const parentStatementDB = await getDoc(parentStatementRef);
        if (!parentStatementDB.exists()) throw new Error("Parent statement does not exist");
        const sectionId = crypto.randomUUID();


        //create statement
        const newDocumentStatement = newSection({
            order,
            statement,
            parentId: statementId,
            topParentId: parentStatementDB.data().topParentId,
            parentDocumentId: statementId,
            sectionId,
            parentSectionId: parentSectionId || "top"
        });

        if (!newDocumentStatement) throw new Error("Error creating statement");
        const newDocumentStatementRef = doc(DB, Collections.statements, sectionId);
        await setDoc(newDocumentStatementRef, newDocumentStatement);

    } catch (error) {
        console.error(error)
    }
}