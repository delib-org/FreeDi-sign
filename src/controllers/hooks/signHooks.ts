import { useSelector } from "react-redux";
import { listenToSignatures } from "../db/signatures/getSignatures";
import { signaturesSelector } from "../slices/statementsSlice";
import { useEffect } from "react";
import { DocumentSigns } from "delib-npm";

export function useSignatures(statementId: string | undefined): DocumentSigns | undefined {
    try {

        if (!statementId) return undefined;
        const signatures: DocumentSigns | undefined = useSelector(signaturesSelector(statementId));

        useEffect(() => {
            if (!statementId) return;

           
          
            const unsubscribe = listenToSignatures(statementId);

            return ()=>{
                unsubscribe();
            } 
        }, [statementId]);

        return signatures;
    } catch (error) {
        console.error(error);
        return undefined;
    }


}