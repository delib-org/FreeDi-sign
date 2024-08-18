import { useEffect, useState } from "react";
import { membersAllowed, Role, Statement } from "delib-npm";
import { getStatement, listenToDocument } from "../db/statements/getStatements";
import { useSelector } from "react-redux";
import { documentSelector } from "../slices/statementsSlice";
import { getSubscription } from "../db/subscriptions/getSubscriptions";
import { selectUser } from "../slices/userSlice";

interface Props {
    statements: Statement[];
    statement: Statement | undefined;
    isLoading: boolean;
    isError: boolean;
    isAuthorized: boolean;
    role: Role;
}
export function useDocument(statementId: string | undefined): Props {

    try {
        const user = useSelector(selectUser);
        const [isLoading] = useState<boolean>(false);
        const [statement, setStatement] = useState<Statement | undefined>(undefined);
        const statements: Statement[] = useSelector(documentSelector(statementId || ""));
        const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
        const [role, setRole] = useState<Role>(Role.unsubscribed);


        useEffect(() => {
            if (!statementId) return;
            getSubscription(statementId).then((subscription) => {
                if (subscription) {
                    const { role } = subscription;
                    if (role === Role.admin || role === Role.member) setIsAuthorized(true);
                    setRole(role);
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

        useEffect(()=>{
            if(statement?.membership?.typeOfMembersAllowed === membersAllowed.all && user?.isAnonymous){
                setIsAuthorized(true);
                setRole(Role.unsubscribed);
            }
        },[statement, user])

        const _statements = isAuthorized ? statements : [];
        const _statement = isAuthorized ? statement : undefined;

        return { statements: _statements, isError: false, isLoading, statement: _statement, isAuthorized, role }
    } catch (error) {
        console.error(error)
        return { statements: [], isError: true, isLoading: false, statement: undefined, isAuthorized: false, role: Role.unsubscribed }
    }
}