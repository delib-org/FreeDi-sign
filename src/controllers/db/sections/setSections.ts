import { Collections, Statement } from "delib-npm";
import { doc, updateDoc } from "firebase/firestore";
import { DB } from "../config";

interface EditSectionProps {
    statement:Statement;
    newText?:string;
}

export function editSection({statement,newText}:EditSectionProps):void {
    try {
        const statementRef = doc(DB, Collections.statements, statement.statementId);
        updateDoc(statementRef,{
            statement: newText
        }); 
    } catch (error) {
        console.error(error);
    }
}