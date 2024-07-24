import { Collections, Statement } from "delib-npm";
import { doc, updateDoc } from "firebase/firestore";
import { DB } from "../config";

interface EditCommentProps {
    statement:Statement;
    newText?:string;
}

export function editComment({statement,newText}:EditCommentProps):void {
    try {
        const statementRef = doc(DB, Collections.statements, statement.statementId);
        updateDoc(statementRef,{
            statement: newText
        }); 
    } catch (error) {
        console.error(error);
    }
}