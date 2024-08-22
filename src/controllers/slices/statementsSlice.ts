import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Statement, updateArray, StatementSchema, writeZodError, StatementType, DocumentType, DocumentSigns } from 'delib-npm'



export interface StatementsState {
    statements: Statement[]
    signatures: DocumentSigns[]
}

const initialState: StatementsState = {
    statements: [],
    signatures: []
}

export const counterSlice = createSlice({
    name: 'statements',
    initialState,
    reducers: {
        setStatements: (state, action: PayloadAction<Statement[]>) => {
            try {
                const statements = action.payload;

                statements.forEach((statement) => {
                    try {
                        const results = StatementSchema.safeParse(statement);
                        if (results.error) writeZodError(results.error, statement);
                        state.statements = updateArray(state.statements, statement, "statementId");
                    } catch (error) {
                        console.error("Error setting statement: ", error);
                    }
                });
            } catch (error) {
                console.error("Error setting statements: ", error);
            }
        },
        setStatement: (state, action: PayloadAction<Statement>) => {
            try {
                const statement = action.payload;
                state.statements = updateArray(state.statements, statement, "statementId");
            } catch (error) {
                console.error("Error setting statement: ", error);
            }
        },
        deleteStatement: (state, action: PayloadAction<string>) => {
            try {
                const statementId = action.payload;
                state.statements = state.statements.filter((statement) => statement.statementId !== statementId);
            } catch (error) {
                console.error("Error deleting statement: ", error);
            }
        },
        setSignatures: (state, action: PayloadAction<DocumentSigns>) => {
            try {
                const signatures = action.payload
                if (signatures)
                    state.signatures = updateArray(state.signatures, signatures, "documentId");
            } catch (error) {
                console.error("Error setting signatures: ", error);
            }
        },
    }
})

// Action creators are generated for each case reducer function
export const { setStatements, setStatement, deleteStatement,setSignatures } = counterSlice.actions

export const selectStatements = (state: { statements: StatementsState }) => state.statements.statements;
export const selectTopStatements = createSelector(
    (state: { statements: StatementsState }) => state.statements.statements,
    (statements) => statements.filter((statement) => statement.parentId === "top")
);
export const selectStatementsByCreatorId = (creatorId: string | undefined) => {
    return createSelector(
        (state: { statements: StatementsState }) => state.statements.statements,
        (statements) => statements.filter((statement) => statement.creatorId === creatorId)
    );
};

export const statementSelector = (statementId?: string) => createSelector(
    (state: { statements: StatementsState }) => state.statements.statements,
    (statements) => statements.find((statement) => statement.statementId === statementId)
);

export const documentSelector = (documentId: string) => createSelector(
    (state: { statements: StatementsState }) => state.statements.statements,
    (statements) => statements.filter((statement) => statement.documentSettings?.parentDocumentId === documentId && statement.statementType === StatementType.document)
);

export const documentSelectorByStatementId = (documentId: string) => createSelector(
    (state: { statements: StatementsState }) => state.statements.statements,
    (statements) => statements.find((statement) => statement.documentSettings?.parentDocumentId === documentId)
);


//sections selector
export const sectionsSelector = (statementId?: string) => createSelector(
    (state: { statements: StatementsState }) => state.statements.statements,
    (statements) => statements.filter((statement) => statement.parentId === statementId && statement.documentSettings?.type === DocumentType.section)
);

//paragraphs selector
export const paragraphsSelector = (statementId: string) => createSelector(
    (state: { statements: StatementsState }) => state.statements.statements,
    (statements) => statements.filter((statement) => statement.parentId === statementId && statement.documentSettings?.type === DocumentType.paragraph)
);

export const documentParagraphsSelector = (documentId: string) => createSelector(
    (state: { statements: StatementsState }) => state.statements.statements,
    (statements) => statements.filter((statement) => statement.documentSettings?.parentDocumentId === documentId && statement.documentSettings?.type === DocumentType.paragraph)
);
//comments selector
export const commentsSelector = (statementId: string) => createSelector(
    (state: { statements: StatementsState }) => state.statements.statements,
    (statements) => statements.filter((statement) => statement.parentId === statementId && statement.documentSettings?.type === DocumentType.comment)
);

//signatures selector
export const signaturesSelector = (documentId: string) => createSelector(
    (state: {  statements: StatementsState  }) => state.statements.signatures,
    (signatures) => signatures.find((signature) => signature.documentId === documentId)
);

export const selectStatement = (state: { statements: StatementsState }, statementId: string) => state.statements.statements.find((statement) => statement.statementId === statementId);

export default counterSlice.reducer