import { Statement, StatementType } from "delib-npm";
import { store } from "../../model/store";

interface NewStatement {
    statement: string;
    parentId: string;
    topParentId: string;
    parentDocumentId: string;
    order: number;  
}
export function newStatement({ statement, parentId, topParentId, parentDocumentId, order}: NewStatement): Statement | undefined {
    try {

        const creator = store.getState().user.user;
        if (!creator) throw new Error("User not found");
        const creatorId = creator.uid;
        const lastUpdate: number = new Date().getTime();
        const documentSettings = {
            parentDocumentId,
            order
        }

        const statementId = crypto.randomUUID();
        return {
            statement,
            statementId,
            parentId,
            creatorId,
            creator,
            topParentId,
            lastUpdate,
            createdAt: lastUpdate,
            statementType: StatementType.document,
            consensus: 0,
            documentSettings
        }
    } catch (error) {
        console.error(error)
        return undefined
    }
}