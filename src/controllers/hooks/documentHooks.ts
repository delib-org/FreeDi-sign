import { useEffect, useState } from "react";
import { membersAllowed, Role, Statement } from "delib-npm";
import { getStatement, listenToDocument, listenToStatement } from "../db/statements/getStatements";
import { useDispatch, useSelector } from "react-redux";
import { documentSelector, statementSelector } from "../slices/statementsSlice";
import { getSubscription } from "../db/subscriptions/getSubscriptions";
import { selectUser } from "../slices/userSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
    const navigate = useNavigate();

    const user = useSelector(selectUser);
    const statement = useSelector(statementSelector(statementId));
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const statements: Statement[] = useSelector(documentSelector(statementId || ""));
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [role, setRole] = useState<Role>(Role.unsubscribed);

    const pathElements = pathname.split("/");
    const isAnonymousPage = pathElements.includes("doc-anonymous");

    useEffect(() => {
        if (statementId) {
            localStorage.setItem("statementId", statementId);
        }
    }, [statementId])


    useEffect(() => {
   
        let unsubscribe: () => void = () => {};
        let unsubscribe2: () => void = () => {};
        // eslint-disable-next-line prefer-const
        ({ unsubscribe2, unsubscribe } = authorize(unsubscribe2, unsubscribe));
        return () => {
            if (unsubscribe) unsubscribe();
            if (unsubscribe2) unsubscribe2();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statementId, user])



    useEffect(() => {

        if (statement) {
         
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }

    }, [statement])


    try {

        const _statements = isAuthorized ? statements : [];
        const _statement = isAuthorized ? statement : undefined;

        return { statements: _statements, isError: false, isLoading, statement: _statement, isAuthorized, role }
    } catch (error) {
        console.error(error)
        return { statements: [], isError: true, isLoading: false, statement: undefined, isAuthorized: false, role: Role.unsubscribed }
    }

    function authorize(unsubscribe2: () => void, unsubscribe: () => void) {
        if (statementId) {
            if (isAnonymousPage) {
                if (user) {

                    setIsLoading(true);
                    setIsAuthorized(true);
                    unsubscribe2 = listenToStatement(statementId);
                    unsubscribe = listenToDocument(statementId);
                } else {

                    anonymousLogin();
                }
            } else {

                if (!user) {
                    navigate("/login");
                } else if (user.isAnonymous === false) {
                    getSubscription(statementId).then((subscription) => {
                        if (subscription) {

                            dispatch(setSubscription(subscription));
                            if (subscription.role === Role.admin) {

                                setRole(Role.admin);
                                setIsAuthorized(true);
                                setIsLoading(false);
                                unsubscribe2 = listenToStatement(statementId);
                                unsubscribe = listenToDocument(statementId);
                            } else {
                                setIsAuthorized(false);
                                setRole(Role.unsubscribed);
                                setIsLoading(false);
                            }
                        } else {

                            setIsAuthorized(false);
                            setRole(Role.unsubscribed);
                            setIsLoading(false);
                        }
                    });
                } else {
                    setIsAuthorized(false);
                    setRole(Role.unsubscribed);
                    setIsLoading(false);
                }
            }
        }
        return { unsubscribe2, unsubscribe };
    }
}