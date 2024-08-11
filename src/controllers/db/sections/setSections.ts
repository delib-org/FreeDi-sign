import { Collections, Statement } from "delib-npm";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { DB } from "../config";




export function setSectionToDB(newSection: Statement): void {
    try {


        if (!newSection) throw new Error("Error creating new section");

        const { statementId } = newSection;

        const newSectionRef = doc(DB, Collections.statements, statementId);
        setDoc(newSectionRef, newSection, { merge: true });
        console.log("new section created",statementId)


    } catch (error) {
        console.error(error)
    }
}


interface EditSectionProps {
    statement: Statement;
    newText: string;
}

export function updateSectionTitleToDB({ statement, newText }: EditSectionProps): void {
    try {
        const { statementId } = statement;
        if (!statementId) throw new Error("statementId is required");
        if (!newText) throw new Error("newText is required");

        const statementRef = doc(DB, Collections.statements, statementId);
        updateDoc(statementRef, { statement: newText });
    } catch (error) {
        console.error(error);
    }
}