import { Collections, Statement } from "delib-npm";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseDb } from "../config";




export function setSectionToDB(newSection: Statement): void {
    try {


        if (!newSection) throw new Error("Error creating new section");

        const { statementId } = newSection;

        const newSectionRef = doc(firebaseDb, Collections.statements, statementId);
        setDoc(newSectionRef, newSection, { merge: true });
  


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

        const statementRef = doc(firebaseDb, Collections.statements, statementId);
        updateDoc(statementRef, { statement: newText });
    } catch (error) {
        console.error(error);
    }
}

export async function deleteSection(sectionId?:string): Promise<boolean> {
    try {
        if(!sectionId) throw new Error("sectionId is required");
        const result = confirm("Are you sure you want to delete this section?");
        if (!result) return false;

        const newSectionRef = doc(firebaseDb, Collections.statements, sectionId);
       
        await deleteDoc(newSectionRef);
        return true;

    } catch (error) {
        console.error(error)
        return false;
    }
}
