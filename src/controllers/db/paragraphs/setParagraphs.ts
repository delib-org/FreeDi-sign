import { Collections, Statement, DocumentType } from "delib-npm";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseDb } from "../config";
import { createNewStatement } from "../../general.ts/statement_helpers";


export interface SetSectionToDBProps {
    statement: Statement;
    order: number;
    isTop?: boolean;
    text: string;
}


export async function setParagraphToDB({ statement, order, text }: SetSectionToDBProps): Promise<void> {
    try {

        const newSection: Statement | undefined = createNewStatement({ title:text, statement, order, isTop: false, type: DocumentType.paragraph });
        if (!newSection) throw new Error("Error creating new section");
        const { statementId } = newSection;
      
        const newSectionRef = doc(firebaseDb, Collections.statements, statementId);
        await setDoc(newSectionRef, newSection);
        return;


    } catch (error) {
        console.error(error)
    }
}

interface EditParagraphProps {
    statement: Statement;
    newText?: string;
}

export function updateParagraphTextToDB({ statement, newText }: EditParagraphProps): void {
    try {
        const statementRef = doc(firebaseDb, Collections.statements, statement.statementId);
        updateDoc(statementRef, {
            statement: newText !== "" ? newText : "New Paragraph"
        });
    } catch (error) {
        console.error(error);
    }
}

export async function deleteParagraphFromDB(statement: Statement): Promise<void> {
    try {
        const statementRef = doc(firebaseDb, Collections.statements, statement.statementId);
     
        updateDoc(statementRef, { "statementSettings.show": false });

        //delete all comments and all evaluations
        //TODO: implement this
    } catch (error) {
        console.error(error)
    }

}