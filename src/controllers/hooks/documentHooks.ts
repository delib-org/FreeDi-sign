import { useEffect, useState } from "react";
import { membersAllowed, Role, Statement } from "delib-npm";
import { getStatement, listenToDocument } from "../db/statements/getStatements";
import { useDispatch, useSelector } from "react-redux";
import { documentSelector } from "../slices/statementsSlice";
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
    const subscription = useSelector(selectSubscriptionByStatementId(statementId));
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [statement, setStatement] = useState<Statement | undefined>(undefined);
    const statements: Statement[] = useSelector(documentSelector(statementId || ""));
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [role, setRole] = useState<Role>(Role.unsubscribed);

    const pathElements = pathname.split("/");
    const isAnonymousPage = pathElements.includes("doc-anonymous");

    useEffect(() => {
        if (statementId){
            console.log("check for statementId", statementId)
            localStorage.setItem("statementId", statementId);
        }
    }, [statementId])

    useEffect(() => {
        let unsubscribe: () => void;

        if (statementId && user && isAnonymousPage) {
            console.log("we have got a statementId and a user")
            setIsLoading(true);
            unsubscribe = listenToDocument(statementId);

        } else {
            //in case the user is not logged in
            //in case this is an anonymous page
            if (anonymousLogin)
                anonymousLogin();
            else {
                //in case the user is not logged in and this is not an anonymous page
                setIsLoading(false);
                navigate("/login");
            }
        }
        return () => {
            if (unsubscribe) unsubscribe();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statementId, user])

    useEffect(() => {
        let unsubscribe: () => void;
        if (!isAnonymousPage && user) {
            if (user.isAnonymous) {
                navigate("/401")
                return;
            }

            getSubscription(statementId).then((subscription) => {
                if (subscription) {
                    dispatch(setSubscription(subscription));
                    if (subscription.role === Role.admin) {
                        setRole(Role.admin);
                        setIsAuthorized(true);
                        listenToDocument(statementId);
                    } else {
                        setIsAuthorized(false);
                        navigate("/401")
                        return;
                    }
                } else {
                    setIsAuthorized(false);
                    navigate("/401")
                    return;
                }
            });
        }
        return () => {
            if (unsubscribe) unsubscribe();
        }
    }, [dispatch, isAnonymousPage, navigate, statementId, user])

    useEffect(() => {

        if (statement) {
            console.log("we have a statement")
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
}