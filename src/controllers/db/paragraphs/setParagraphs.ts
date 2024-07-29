import { Collections, Statement } from "delib-npm";
import { doc, updateDoc } from "firebase/firestore";
import { DB } from "../config";

interface EditParagraphProps {
    statement:Statement;
    newText?:string;
}

export function updateParagraphTextToDB({statement,newText}:EditParagraphProps):void {
    try {
        const statementRef = doc(DB, Collections.statements, statement.statementId);
        updateDoc(statementRef,{
            statement: newText !== "" ? newText : "New Paragraph" 
        }); 
    } catch (error) {
        console.error(error);
    }
}