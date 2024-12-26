import { DocumentType, getRandomUID, Statement, StatementSchema, StatementType, User, UserData } from "delib-npm";
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
        if (!sectionId) sectionId = getRandomUID();
        if (!parentSectionId) parentSectionId = "top";

        const documentSettings = {
            parentDocumentId,
            order,
            sectionId,
            parentSectionId,
            type: DocumentType.section,
            isTop: false
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



        const documentSettings = {
            parentDocumentId,
            order,
            sectionId,
            parentSectionId: sectionId,
            type: DocumentType.paragraph,
            isTop: false
        }

        const statementId = getRandomUID();
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

interface CreateNewStatementProps { title: string, description ?: string, statement: Statement, order: number, isTop ?: boolean, type: DocumentType, user: User, userData:UserData }

export function createNewStatement({ title, description = "", statement, order, isTop, type, user, userData }: CreateNewStatementProps): Statement | undefined {
    try {
        const _user = user || store.getState().user.user;
        if (!_user) throw new Error("User not found");

        const statementId: string = getRandomUID();
    
        const parentDocumentId = statement.documentSettings?.parentDocumentId || statement.statementId;
        console.log(_user)

        const newStatement: Statement = {
            statement: title,
            description,
            statementId,
            parentId: statement.statementId,
            creatorId: _user.uid,
            creator: _user,
            topParentId: statement.topParentId,
            lastUpdate: new Date().getTime(),
            createdAt: new Date().getTime(),
            statementType: StatementType.document,
            consensus: 0,
            statementSettings: {
                show: true
            },
            documentSettings: {
                parentDocumentId,
                order,
                type,
                isTop: isTop||false
            },
            userData

        };
        StatementSchema.parse(newStatement);
        return newStatement;
    } catch (error) {
        console.error(error);
        return undefined;

    }
}


