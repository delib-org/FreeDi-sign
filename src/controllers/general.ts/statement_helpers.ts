import { DocumentType, Statement, StatementSchema, StatementType } from "delib-npm";
import { store } from "../../model/store";


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
    statement: Statement
    level: number;
    statementId: string;
    title: string;
    paragraphs: Statement[];
    sections: DocumentObject[];
}

interface StatementsToDocumentProps {
    section?: Statement;
    statements: Statement[];
    level?: number;


}

export function statementsToDocument({ section, statements, level = 1 }: StatementsToDocumentProps): DocumentObject | undefined {
    try {
        if (!section) return undefined;

        // Get all document statements that are children of the current statement
        const levelStatements = statements.filter((st) => st.statementType === StatementType.document &&
            st.parentId === section.statementId) as Statement[];

        const sections = levelStatements.filter((st) => st.documentSettings?.type === DocumentType.section).sort((a, b) => (a.documentSettings?.order || 0) - (b.documentSettings?.order || 0)) as Statement[];

        const paragraphs = levelStatements.filter((st) => st.documentSettings?.type === DocumentType.paragraph).sort((a, b) => (a.documentSettings?.order || 0) - (b.documentSettings?.order || 0)) as Statement[];

        const document: DocumentObject = {
            statement: section,
            title: section.statement,
            statementId: section.statementId,
            paragraphs,
            level,
            sections: sections.map((section) => statementsToDocument({ section, statements, level: level + 1 })).filter((d) => d !== undefined) as DocumentObject[]
        }
        return document

    } catch (error) {
        console.error(error)
        return undefined
    }

}

export function createNewStatement({ text, docStatement, parentId, order, isTop, type }: { text: string, docStatement: Statement, parentId: string, order: number, isTop?: boolean, type:DocumentType}): Statement | undefined {
    try {
        const user = store.getState().user.user;
        if (!user) throw new Error("User not found");

        const statementId: string = crypto.randomUUID();

        const newStatement: Statement = {
            statement: text,
            statementId,
            parentId,
            creatorId: user.uid,
            creator: user,
            topParentId: docStatement.topParentId,
            lastUpdate: new Date().getTime(),
            createdAt: new Date().getTime(),
            statementType: StatementType.document,
            consensus: 0,
            statementSettings: {
                show: true
            },
            documentSettings: {
                parentDocumentId: docStatement.statementId,
                order,
                type,
                isTop: isTop||false
            }

        };
        StatementSchema.parse(newStatement);
        return newStatement;
    } catch (error) {
        console.error(error);
        return undefined;

    }
}


