import { Collections, Statement } from "delib-npm";
import { doc, updateDoc } from "firebase/firestore";
import { DB } from "../config";
import { DocumentObject } from "../../general.ts/statement_helpers";

interface EditSectionProps {
    document: DocumentObject;
    newText?:string;
}

export function updateSectionTextToDB({document,newText}:EditSectionProps):void {
    try {
        const statementRef = doc(DB, Collections.statements, document.statementId);
        updateDoc(statementRef,{
            statement: newText !== "" ? newText : "New Section" 
        }); 
    } catch (error) {
        console.error(error);
    }
}