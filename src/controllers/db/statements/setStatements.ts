import { Collections } from "delib-npm";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { DB } from "../config";
import { newParagraph, newSection } from "../../general.ts/statement_helpers";

interface SetSectionToDBProps {
    statement: string;
    statementId: string;
    order: number;
    sectionId?: string;
    parentSectionId?: string;
   
}
export async function setSectionToDB({ statement, statementId, order, parentSectionId, sectionId }: SetSectionToDBProps): Promise<void> {
    try {
        const parentStatementRef = doc(DB, Collections.statements, statementId);
        const parentStatementDB = await getDoc(parentStatementRef);
        if (!parentStatementDB.exists()) throw new Error("Parent statement does not exist");
        sectionId = sectionId || crypto.randomUUID();

        const newParagraphStatement = newSection({
            order,
            statement,
            parentId: statementId,
            topParentId: parentStatementDB.data().topParentId,
            parentDocumentId: statementId,
            sectionId,
            parentSectionId: parentSectionId || "top",

        });

        if (!newParagraphStatement) throw new Error("Error creating statement");
        const newParagraphStatementRef = doc(DB, Collections.statements, sectionId);
        await setDoc(newParagraphStatementRef, newParagraphStatement);
        return;


    } catch (error) {
        console.error(error)
    }
}

export async function setParagraphToDB({ statement, statementId, order, sectionId }: SetSectionToDBProps): Promise<void> {
    try {
        const parentStatementRef = doc(DB, Collections.statements, statementId);
        const parentStatementDB = await getDoc(parentStatementRef);
        if (!parentStatementDB.exists()) throw new Error("Parent statement does not exist");
        sectionId = sectionId || crypto.randomUUID();

        const newParagraphStatement = newParagraph({
            order,
            statement,
            parentId: statementId,
            topParentId: parentStatementDB.data().topParentId,
            parentDocumentId: statementId,
            sectionId

        });

        if (!newParagraphStatement) throw new Error("Error creating statement");
        const newParagraphStatementRef = collection(DB, Collections.statements);
        await addDoc(newParagraphStatementRef, newParagraphStatement);
        return;


    } catch (error) {
        console.error(error)
    }
}