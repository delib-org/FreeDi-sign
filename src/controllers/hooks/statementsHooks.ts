import { useEffect, useState } from "react";

import { Statement } from "delib-npm";

import { listenToStatements } from "../db/statements/getStatements";
import { useSelector } from "react-redux";
import { selectStatementsByCreatorId } from "../slices/statementsSlice";
import { selectUser } from "../slices/userSlice";


export function useStatements() {
    const user = useSelector(selectUser);
    if (!user) return { statements: [], isLoading: false, error: "User not found" };
    
    const userId = user.uid;
    const statements: Statement[] = useSelector(selectStatementsByCreatorId(userId));
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(false);


    useEffect(() => {
        const unsubscribe = listenToStatements(setIsLoading, setError)
        return () => {
            unsubscribe();
        }
    }, []);



    return { statements, isLoading, error };
}