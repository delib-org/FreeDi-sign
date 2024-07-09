import { DocumentType, Statement, StatementType } from "delib-npm";
import { store } from "../../model/store";
import { _, p } from "@vite-pwa/assets-generator/dist/shared/assets-generator.5e51fd40.mjs";
import { doc } from "firebase/firestore";

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
    statementId: string;
    title: string;
    paragraphs: Statement[];
    sections: DocumentObject[];
}

interface StatementsToDocumentProps {
    section?: Statement;
    statements: Statement[];
    parentSectionId: string;

}

export function statementsToDocument({ section, statements, parentSectionId = "top" }: StatementsToDocumentProps):DocumentObject|undefined{
    try {
        if (!section) return undefined
console.log('section', section.statement.toUpperCase())
        // Get all document statements that are children of the current statement
        const levelStatements = statements.filter((st) => st.statementType === StatementType.document &&
            st.parentId === section.statementId) as Statement[];
        console.log('levelStatements', levelStatements)
        
        const sections = levelStatements.filter((st) => st.documentSettings?.type === DocumentType.section).sort((a, b) => (a.documentSettings?.order || 0) - (b.documentSettings?.order || 0)) as Statement[];
        console.log("sections", sections)
        
        const paragraphs = levelStatements.filter((st) => st.documentSettings?.type === DocumentType.paragraph).sort((a, b) => (a.documentSettings?.order || 0) - (b.documentSettings?.order || 0)) as Statement[];
        console.log("paragraphs", paragraphs)
        
        const document: DocumentObject = {
            title: section.statement,
            statementId: section.statementId,
            paragraphs,
            sections: sections.map((section) => statementsToDocument({ section, statements, parentSectionId: section.statementId }))
        }
        return document

    } catch (error) {
        console.error(error)
        return undefined
    }

}