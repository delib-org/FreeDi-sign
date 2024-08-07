import { Collections, DocumentType, Statement, StatementSchema, StatementType } from "delib-npm";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
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

        StatementSchema.parse(newSection);


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
            statementSettings: {
                show:true
            },
            documentSettings: {
                parentDocumentId:docStatement.statementId,
                order,
                type: DocumentType.comment,
                isTop:false,
            }

        };


        const newSectionRef = doc(DB, Collections.statements, statementId);
        await setDoc(newSectionRef, newSection);
        return;


    } catch (error) {
        console.error(error)
    }
}

export async function deleteParagraphFromDB(statement:Statement):Promise<void> {
    try {
        const statementRef = doc(DB, Collections.statements, statement.statementId);
        console.log("deleting paragraph", statement.statementId);
        updateDoc(statementRef,{"statementSettings.show":false});

        //delete all comments and all evaluations
        //TODO: implement this
    } catch (error) {
        console.error(error)
    }   

}