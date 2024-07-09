import { Collections, DocumentType, Statement, StatementType } from "delib-npm";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { DB } from "../config";
import { newParagraph, newSection } from "../../general.ts/statement_helpers";
import { store } from "../../../model/store";

interface SetSectionToDBProps {
    parentDocumentId: string
    parentId: string,
    order: number
    isTop?: boolean,
    text: string
}
export async function setSectionToDB({parentDocumentId, parentId, order, isTop = false, text }: SetSectionToDBProps): Promise<void> {
    try {
        const parentStatementRef = doc(DB, Collections.statements, parentId);
        const parentStatementDB = await getDoc(parentStatementRef);
        if (!parentStatementDB.exists()) throw new Error("Parent statement does not exist");

        const user = store.getState().user.user;
        if(!user) throw new Error("User not found");

        const statementId:string = crypto.randomUUID();

        const newSection:Statement = {
            statement: text,
            statementId,
            parentId,
            creatorId: user.uid,
            creator:user,
            topParentId: parentStatementDB.data().topParentId,
            lastUpdate: new Date().getTime(),
            createdAt: new Date().getTime(),
            statementType: StatementType.document,
            consensus: 0,
            documentSettings: {
                parentDocumentId,
                order,
                type: DocumentType.section,
                isTop
            }

        };


        const newSectionRef = doc(DB, Collections.statements, statementId);
        await setDoc(newSectionRef, newSection);
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
        if (!sectionId) throw new Error("Section id is required");


        const newParagraphStatement = newParagraph({
            order,
            statement,
            parentId: statementId,
            topParentId: parentStatementDB.data().topParentId,
            parentDocumentId: statementId,
            sectionId

        });

        if (!newParagraphStatement) throw new Error("Error creating statement");
        const newParagraphStatementRef = doc(DB, Collections.statements, newParagraphStatement.statementId);
        await setDoc(newParagraphStatementRef, newParagraphStatement);
        return;


    } catch (error) {
        console.error(error)
    }
}