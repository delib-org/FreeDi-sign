import { useEffect, useState } from "react";
import { membersAllowed, Role, Statement } from "delib-npm";
import { getStatement, listenToDocument } from "../db/statements/getStatements";
import { useDispatch, useSelector } from "react-redux";
import { documentSelector } from "../slices/statementsSlice";
import { getSubscription } from "../db/subscriptions/getSubscriptions";
import { selectUser } from "../slices/userSlice";
import { useLocation, useParams } from "react-router-dom";
import { anonymousLogin } from "../db/authCont";
import { selectSubscriptionByStatementId, setSubscription } from "../slices/subscriptionsSlice";

interface Props {
    statements: Statement[];
    statement: Statement | undefined;
    isLoading: boolean;
    isError: boolean;
    isAuthorized: boolean;
    role: Role;
}
export function useDocument(): Props {

    //hooks
    const { pathname } = useLocation();
    const { statementId } = useParams<{ statementId: string }>();
    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    const subscription = useSelector(selectSubscriptionByStatementId(statementId));
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [statement, setStatement] = useState<Statement | undefined>(undefined);
    const statements: Statement[] = useSelector(documentSelector(statementId || ""));
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [role, setRole] = useState<Role>(Role.unsubscribed);

    const pathElements = pathname.split("/");
    const isAnonymousPage = pathElements.includes("doc-anonymous");

    useEffect(() => {
        if (statementId && user) {
            
            localStorage.setItem("statementId", statementId);
            setIsLoading(true);
            if (user.isAnonymous === false && !isAnonymousPage) {
                getSubscription(statementId).then((subscription) => {
                    if (subscription) {
                        
                        dispatch(setSubscription(subscription));
                    }
                    setIsLoading(false);
                });
            }
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statementId, user])

    useEffect(() => {
        
        if (subscription) {

            setRole(subscription.role);
            if (subscription.role === Role.admin) setIsAuthorized(true);
        }
    }, [subscription])

    useEffect(() => {
        
        try {

            if (!statementId) throw new Error("No statementId provided");
            if (!user) {

                return;
            }
            if (isAnonymousPage) {
                if (!user) anonymousLogin();
                else setIsAuthorized(true);

                setRole(Role.unsubscribed);
            }

        } catch (error) {
            console.error(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statementId, user]);

    useEffect(() => {
        if (statement?.membership?.typeOfMembersAllowed === membersAllowed.all && user?.isAnonymous) {
            setIsAuthorized(true);
            setRole(Role.unsubscribed);
        }
    }, [statement, user])

    useEffect(() => {
        let unsubscribe: () => void;
        if (!statement && statementId) {
            unsubscribe = listenToDocument(statementId);
            setIsLoading(true);
            getStatement(statementId).then((statement) => {
                setIsLoading(false);
                if (statement) setStatement(statement);
            });
        }
        return () => {
            unsubscribe();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthorized, statementId])
    try {

        const _statements = isAuthorized ? statements : [];
        const _statement = isAuthorized ? statement : undefined;

        return { statements: _statements, isError: false, isLoading, statement: _statement, isAuthorized, role }
    } catch (error) {
        console.error(error)
        return { statements: [], isError: true, isLoading: false, statement: undefined, isAuthorized: false, role: Role.unsubscribed }
    }
}