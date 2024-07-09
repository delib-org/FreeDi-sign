import { useEffect, useState } from "react";
import { Statement } from "delib-npm";
import { getStatement, listenToDocument } from "../db/statements/getStatements";
import { useSelector } from "react-redux";
import { documentSelector } from "../slices/statementsSlice";

interface Props {
    statements: Statement[];
    docStatement: Statement|undefined;
    isLoading: boolean;
    isError: boolean;
}
export function useDocument(statementId: string|undefined): Props {
  
    try {
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const [statement, setStatement] = useState<Statement | undefined>(undefined);
        const statements: Statement[] = useSelector(documentSelector(statementId||""));
        
        
        useEffect(() => {
            if (!statementId) return;
            const unsubscribe = listenToDocument(statementId);
            getStatement(statementId).then((statement) => {
                if (statement) setStatement(statement);
            });
            return () => {
                unsubscribe();
            }
        }, [statementId]);

    
        return { statements, isError: false, isLoading, docStatement: statement }
    } catch (error) {
        console.error(error)
        return { statements: [], isError: true, isLoading: false,docStatement:undefined }
    }
}