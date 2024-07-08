import { Statement, StatementType } from "delib-npm";
import { store } from "../../model/store";
import { _ } from "@vite-pwa/assets-generator/dist/shared/assets-generator.5e51fd40.mjs";

interface NewSection {
    sectionId?: string;
    parentSectionId?: string;
    statement: string;
    parentId: string;
    topParentId: string;
    parentDocumentId: string;
    order: number;
}
export function newSection({ parentSectionId, sectionId, statement, parentId, topParentId, parentDocumentId, order }: NewSection): Statement | undefined {
    try {

        const creator = store.getState().user.user;
        if (!creator) throw new Error("User not found");
        const creatorId = creator.uid;
        const lastUpdate: number = new Date().getTime();
        if (!sectionId) sectionId = crypto.randomUUID();
        if (!parentSectionId) parentSectionId = "top";

        const documentSettings: any = {
            parentDocumentId,
            order,
            sectionId,
            parentSectionId
        }

        const statementId = sectionId;
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
interface NewParagraphProps {
    sectionId: string;
    statement: string;
    parentId: string;
    topParentId: string;
    parentDocumentId: string;
    order: number;
}

export function newParagraph({ sectionId, statement, parentId, topParentId, parentDocumentId, order }: NewParagraphProps): Statement | undefined {
    try {

        const creator = store.getState().user.user;
        if (!creator) throw new Error("User not found");
        const creatorId = creator.uid;
        const lastUpdate: number = new Date().getTime();



        const documentSettings: any = {
            parentDocumentId,
            order,
            sectionId,
            type: "p"
        }

        const statementId = sectionId;
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
    paragraphs: Statement[];
    sections: DocumentObject[];
}

interface StatementsToDocumentProps {
    statementId: string | undefined;
    statements: Statement[];
    parentSectionId: string;
    sectionId?: string;
}

export function statementsToDocument({ statementId, statements, parentSectionId = "top", sectionId }: StatementsToDocumentProps): DocumentObject[] {
    try {
        if (!statementId) return []

        const documentStatements = statements.filter((statement) => statement.statementType === StatementType.document &&
            statement.documentSettings?.parentDocumentId === statementId &&
            statement.documentSettings?.parentSectionId === parentSectionId);

        return documentStatements
            .sort((a, b) => (a.documentSettings?.order || 0) - (b.documentSettings?.order || 0))
            .map((documentStatement) => {

                const sections = statementsToDocument({ statementId, statements, parentSectionId: documentStatement.statementId });
                const paragraphs = statements.filter((statement) => statement.statementType === StatementType.document &&
                    statement.documentSettings?.sectionId === sectionId &&
                    statement.documentSettings?.type === "p")
                const _sectionId = documentStatement.documentSettings?.sectionId || crypto.randomUUID()
                return {
                    sectionId:_sectionId,
                    statementId: documentStatement.statementId,
                    title: documentStatement.statement,
                    paragraphs,
                    sections
                }
            })

    } catch (error) {
        console.error(error)
        return []
    }

}