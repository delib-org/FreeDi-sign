
import { useEffect, useState, useCallback } from "react";
import { Role, Statement, User, UserData, Signature } from "delib-npm";
import { listenToDocument, listenToStatement } from "../db/statements/getStatements";
import { useDispatch, useSelector } from "react-redux";
import { documentSelector, statementSelector, mySignaturesSelector } from "../slices/statementsSlice";
import { getSubscription } from "../db/subscriptions/getSubscriptions";
import { selectUser, selectUserData } from "../slices/userSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { anonymousLogin } from "../db/authCont";
import { setSubscription } from "../slices/subscriptionsSlice";

interface DocumentHookResult {
  statements: Statement[];
  statement?: Statement;
  isLoading: boolean;
  isError: boolean;
  isAuthorized: boolean;
  role: Role;
  user: User | null;
  userData: UserData | undefined;
  mySignature?: Signature;
}

export function useDocument(): DocumentHookResult {
  const { pathname } = useLocation();
  const { statementId } = useParams<{ statementId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const userData = useSelector(selectUserData);
  const statement = useSelector(statementSelector(statementId));
  const statements = useSelector(documentSelector(statementId || ""));
  const mySignature = useSelector(mySignaturesSelector(statementId));

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [role, setRole] = useState<Role>(Role.unsubscribed);

  const isAnonymousPage = pathname.includes("doc-anonymous");

  // Memoized authorization function
  const handleAuthorization = useCallback(async () => {
    if (!statementId) return { unsubscribe: () => {}, unsubscribe2: () => {} };

    if (isAnonymousPage) {
      if (!user) {
        anonymousLogin();
        return { unsubscribe: () => {}, unsubscribe2: () => {} };
      }
      setIsLoading(true);
      setIsAuthorized(true);
      return {
        unsubscribe2: listenToStatement(statementId),
        unsubscribe: listenToDocument(statementId)
      };
    }

    if (!user) {
      navigate("/login");
      return { unsubscribe: () => {}, unsubscribe2: () => {} };
    }

    if (user.isAnonymous) {
      setIsAuthorized(false);
      setRole(Role.unsubscribed);
      setIsLoading(false);
      return { unsubscribe: () => {}, unsubscribe2: () => {} };
    }

    const subscription = await getSubscription(statementId);
    if (subscription) {
      dispatch(setSubscription(subscription));
      if (subscription.role === Role.admin) {
        setRole(Role.admin);
        setIsAuthorized(true);
        setIsLoading(false);
        return {
          unsubscribe2: listenToStatement(statementId),
          unsubscribe: listenToDocument(statementId)
        };
      }
    }
    
    setIsAuthorized(false);
    setRole(Role.unsubscribed);
    setIsLoading(false);
    return { unsubscribe: () => {}, unsubscribe2: () => {} };
  }, [statementId, isAnonymousPage, user, navigate, dispatch]);

  useEffect(() => {
    if (statementId) {
      localStorage.setItem("statementId", statementId);
    }
  }, [statementId]);

  useEffect(() => {
    let unsubscribe = () => {};
    let unsubscribe2 = () => {};

    handleAuthorization().then(({ unsubscribe: unsub1, unsubscribe2: unsub2 }) => {
      unsubscribe = unsub1;
      unsubscribe2 = unsub2;
    });

    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, [handleAuthorization]);

  useEffect(() => {
    setIsLoading(!statement);
  }, [statement]);

  try {
    return {
      statements: isAuthorized ? statements : [],
      statement: isAuthorized ? statement : undefined,
      isError: false,
      isLoading,
      isAuthorized,
      role,
      user,
      userData,
      mySignature
    };
  } catch (error) {
    console.error(error);
    return {
      statements: [],
      isError: true,
      isLoading: false,
      isAuthorized: false,
      role: Role.unsubscribed,
      user: null,
      userData: undefined,
      mySignature: undefined
    };
  }
}
