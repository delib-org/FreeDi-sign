import { Collections, DocumentType, Statement, User } from "delib-npm";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { DB } from "../config";
import { store } from "../../../model/store";
import { createNewStatement } from "../../general.ts/statement_helpers";

interface AddCommentToDBProps {
    title: string;
    description?: string;
    parentStatement: Statement;
    order: number;
}

export function addCommentToDB({
    title,
    description,
    parentStatement,
    order = 0 }: AddCommentToDBProps): void {
    try {

        const user = store.getState().user.user;
        if (!user) throw new Error("User not found");
        console.log(store.getState().user.usersData)

        const userAnonymous:User = (user.isAnonymous) ? {
            displayName: store.getState().user.usersData.find(u => u.userId === user?.uid)?.displayName || "Anonymous",
            uid: user.uid,
            photoURL: ""
        } : user;
        if (!userAnonymous) throw new Error("User not found");
        console.log(userAnonymous)

        if (!title) {
            throw new Error("Title is required");
        }


        const newStatement: Statement | undefined = createNewStatement({
            title,
            description,
            statement: parentStatement,
            order,
            type: DocumentType.comment,
            isTop: false,
            user: userAnonymous
        });
        if (!newStatement) throw new Error("Error creating new comment");
        const { statementId } = newStatement;

        const statementRef = doc(DB, Collections.statements, statementId);
        setDoc(statementRef, newStatement, { merge: true });

    } catch (error) {
        console.error(error);
    }
}

interface EditCommentProps {
    statement: Statement;
    newText?: string;
}

export function editComment({ statement, newText }: EditCommentProps): void {
    try {
        const statementRef = doc(DB, Collections.statements, statement.statementId);
        updateDoc(statementRef, {
            statement: newText
        });
    } catch (error) {
        console.error(error);
    }
}