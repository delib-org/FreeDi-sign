import { useSelector } from "react-redux";
import { listenToSignatures } from "../db/signatures/getSignatures";
import { signaturesSelector } from "../slices/statementsSlice";
import { useEffect } from "react";
import { DocumentSigns } from "delib-npm";
import { selectUser } from "../slices/userSlice";

export function useSignatures(statementId: string | undefined): DocumentSigns | undefined {
    const signatures: DocumentSigns | undefined = useSelector(signaturesSelector(statementId));
    const user = useSelector(selectUser);



    useEffect(() => {
        if (!statementId) return;
        if (!user) return;


        const unsubscribe = listenToSignatures(statementId);

        return () => {
            unsubscribe();
        }
    }, [statementId, user]);

    return signatures;



}