import { Collections, DocumentType, Statement, StatementType } from "delib-npm";
import { doc, setDoc } from "firebase/firestore";
import { DB } from "../config";
import { store } from "../../../model/store";

interface SetSectionToDBProps {
    docStatement: Statement;
    parentId: string;
    order: number;
    isTop?: boolean;
    text: string;
}
export async function setSectionToDB({docStatement, parentId, order, isTop = false, text }: SetSectionToDBProps): Promise<void> {
    try {
       

        const user = store.getState().user.user;
        if(!user) throw new Error("User not found");

        const statementId:string = crypto.randomUUID();

        const newSection:Statement = {
            statement: text,
            statementId,
            parentId,
            creatorId: user.uid,
            creator:user,
            topParentId: docStatement.topParentId,
            lastUpdate: new Date().getTime(),
            createdAt: new Date().getTime(),
            statementType: StatementType.document,
            consensus: 0,
            documentSettings: {
                parentDocumentId:docStatement.statementId,
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

export async function setParagraphToDB({docStatement, parentId, order, text }: SetSectionToDBProps): Promise<void> {
    try {
      

        const user = store.getState().user.user;
        if(!user) throw new Error("User not found");

        const statementId:string = crypto.randomUUID();

        const newSection:Statement = {
            statement: text,
            statementId,
            parentId,
            creatorId: user.uid,
            creator:user,
            topParentId: docStatement.topParentId,
            lastUpdate: new Date().getTime(),
            createdAt: new Date().getTime(),
            statementType: StatementType.document,
            consensus: 0,
            documentSettings: {
                parentDocumentId:docStatement.statementId,
                order,
                type: DocumentType.paragraph,
                isTop:false
            }

        };


        const newSectionRef = doc(DB, Collections.statements, statementId);
        await setDoc(newSectionRef, newSection);
        return;


    } catch (error) {
        console.error(error)
    }
}

export async function setCommentToDB({docStatement, parentId, order, text }: SetSectionToDBProps): Promise<void> {
    try {
      

        const user = store.getState().user.user;
        if(!user) throw new Error("User not found");

        const statementId:string = crypto.randomUUID();

        const newSection:Statement = {
            statement: text,
            statementId,
            parentId,
            creatorId: user.uid,
            creator:user,
            topParentId: docStatement.topParentId,
            lastUpdate: new Date().getTime(),
            createdAt: new Date().getTime(),
            statementType: StatementType.document,
            consensus: 0,
            documentSettings: {
                parentDocumentId:docStatement.statementId,
                order,
                type: DocumentType.comment,
                isTop:false
            }

        };


        const newSectionRef = doc(DB, Collections.statements, statementId);
        await setDoc(newSectionRef, newSection);
        return;


    } catch (error) {
        console.error(error)
    }
}