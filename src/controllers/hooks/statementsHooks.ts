import { useEffect, useState } from "react";

import { Statement } from "delib-npm";

import { listenToStatements } from "../db/statements/getStatements";
import { useSelector } from "react-redux";
import { selectStatements } from "../slices/statementsSlice";


export function useStatements() {
    const statements: Statement[] = useSelector(selectStatements);
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