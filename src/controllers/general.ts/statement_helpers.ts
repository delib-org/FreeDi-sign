import { Statement, StatementType } from "delib-npm";
import { store } from "../../model/store";

interface NewStatement {
    sectionId?: string;
    parentSectionId?: string;
    statement: string;
    parentId: string;
    topParentId: string;
    parentDocumentId: string;
    order: number;
}
export function newStatement({ parentSectionId, sectionId, statement, parentId, topParentId, parentDocumentId, order }: NewStatement): Statement | undefined {
    try {

        const creator = store.getState().user.user;
        if (!creator) throw new Error("User not found");
        const creatorId = creator.uid;
        const lastUpdate: number = new Date().getTime();
        if (!sectionId) sectionId = crypto.randomUUID();
        if (!parentSectionId) parentSectionId = "top";
        const documentSettings = {
            parentDocumentId,
            order,
            sectionId,
            parentSectionId
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

export interface DocumentObject {
    sectionId: string;
    statementId: string;
    title: string;
    statements: Statement[];
    sections: Document[];
}

export function statementsToDocument(statementId: string|undefined, statements: Statement[], parentSectionId: string = "top"): DocumentObject[] {
    try {
        if (!statementId) return []
   
        const documentStatements = statements.filter((statement) => statement.statementType === StatementType.document &&
            statement.documentSettings?.parentDocumentId === statementId &&
            statement.documentSettings?.parentSectionId === parentSectionId);
        
            return documentStatements.map((documentStatement) => {
            return {
                sectionId: documentStatement.documentSettings?.sectionId || crypto.randomUUID(),
                statementId: documentStatement.statementId,
                title: documentStatement.statement,
                statements: [],
                sections: []
            }
        })

    } catch (error) {
        console.error(error)
        return []
    }

}