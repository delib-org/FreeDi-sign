import { useEffect, useState } from "react";
import { Role, Statement } from "delib-npm";
import { getStatement, listenToDocument } from "../db/statements/getStatements";
import { useSelector } from "react-redux";
import { documentSelector } from "../slices/statementsSlice";
import { getSubscription } from "../db/subscriptions/getSubscriptions";

interface Props {
    statements: Statement[];
    statement: Statement | undefined;
    isLoading: boolean;
    isError: boolean;
    isAuthorized: boolean;
}
export function useDocument(statementId: string | undefined): Props {

    try {
        const [isLoading] = useState<boolean>(false);
        const [statement, setStatement] = useState<Statement | undefined>(undefined);
        const statements: Statement[] = useSelector(documentSelector(statementId || ""));
        const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

        useEffect(() => {
            if (!statementId) return;
            getSubscription(statementId).then((subscription) => {
                if (subscription) {
                    const { role } = subscription;
                    if (role === Role.admin || role === Role.member) setIsAuthorized(true);
                }
            });

            
            const unsubscribe = listenToDocument(statementId);
            getStatement(statementId).then((statement) => {
                if (statement) setStatement(statement);
            });
            return () => {
                unsubscribe();
            }
        }, [statementId]);

        const _statements = isAuthorized ? statements : [];
        const _statement = isAuthorized ? statement : undefined;

        return { statements: _statements, isError: false, isLoading, statement: _statement, isAuthorized }
    } catch (error) {
        console.error(error)
        return { statements: [], isError: true, isLoading: false, statement: undefined, isAuthorized: false }
    }
}