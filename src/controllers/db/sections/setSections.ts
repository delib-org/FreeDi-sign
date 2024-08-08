import { Collections, Statement, DocumentType } from "delib-npm";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { DB } from "../config";
import { createNewStatement, DocumentObject } from "../../general.ts/statement_helpers";

export interface SetSectionToDBProps {
    docStatement: Statement;
    parentId: string;
    order: number;
    isTop?: boolean;
    text: string;
}


export async function setSectionToDB({ docStatement, parentId, order, isTop = false, text }: SetSectionToDBProps): Promise<void> {
    try {

        const newSection: Statement | undefined = createNewStatement({ text, docStatement, parentId, order, isTop, type: DocumentType.section });
        if (!newSection) throw new Error("Error creating new section");

        const { statementId } = newSection;

        const newSectionRef = doc(DB, Collections.statements, statementId);
        await setDoc(newSectionRef, newSection);
        return;


    } catch (error) {
        console.error(error)
    }
}


interface EditSectionProps {
    document: DocumentObject;
    newText?: string;
}

export function updateSectionTextToDB({ document, newText }: EditSectionProps): void {
    try {
        const statementRef = doc(DB, Collections.statements, document.statementId);
        updateDoc(statementRef, {
            statement: newText !== "" ? newText : "New Section"
        });
    } catch (error) {
        console.error(error);
    }
}