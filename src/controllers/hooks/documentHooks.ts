import { useEffect, useState } from "react";
import { Statement } from "delib-npm";
import { listenToDocument } from "../db/statements/getStatements";
import { useSelector } from "react-redux";
import { documentSelector } from "../slices/statementsSlice";

interface Props {
    statements: Statement[];
    isLoading: boolean;
    isError: boolean;
}
export function useDocument(statementId: string|undefined): Props {
  
    try {
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const statements: Statement[] = useSelector(documentSelector(statementId||""));
        useEffect(() => {
            if (!statementId) return;
            const unsubscribe = listenToDocument(statementId)
            return () => {
                unsubscribe();
            }
        }, [statementId]);

    
        return { statements, isError: false, isLoading }
    } catch (error) {
        console.error(error)
        return { statements: [], isError: true, isLoading: false }
    }
}