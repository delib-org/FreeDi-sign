import { DocumentType, Statement, StatementType } from "delib-npm";
import { store } from "../../model/store";
import { _, p } from "@vite-pwa/assets-generator/dist/shared/assets-generator.5e51fd40.mjs";

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
            parentSectionId,
            type: DocumentType.section
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
            parentSectionId: sectionId,
            type: DocumentType.paragraph
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
    paragraphs: Statement[];
    sections: DocumentObject[];
}

interface StatementsToDocumentProps {
    statementId: string | undefined;
    statements: Statement[];
    parentSectionId: string;

}

export function statementsToDocument({ statementId, statements, parentSectionId = "top" }: StatementsToDocumentProps): DocumentObject[] {
    try {
        if (!statementId) return []

        // Get all document statements that are children of the current statement
        const levelStatements = statements.filter((st) => st.statementType === StatementType.document &&
            st.documentSettings?.parentSectionId === parentSectionId) as Statement[];
            
        const sections = levelStatements.filter((st) => st.documentSettings?.type === DocumentType.section).sort((a, b) => (a.documentSettings?.order || 0) - (b.documentSettings?.order || 0)) as Statement[];

        const paragraphs = levelStatements.filter((st) => st.documentSettings?.type === DocumentType.paragraph).sort((a, b) => (a.documentSettings?.order || 0) - (b.documentSettings?.order || 0)) as Statement[];

        return sections
            .map((s) => {
        
                return {
                    statementId: s.statementId,
                    title: s.statement,
                    paragraphs,
                    sections
                }
            })

    } catch (error) {
        console.error(error)
        return []
    }

}