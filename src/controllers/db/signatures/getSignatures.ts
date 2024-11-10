import { Unsubscribe } from "firebase/auth";
import { DB } from "../config";
import { Collections, DocumentSigns, DocumentSignsSchema, getStatementSubscriptionId, Signature, SignatureSchema, User } from "delib-npm";
import { onSnapshot, doc } from "firebase/firestore";
import { store } from "../../../model/store";
import { setMySignature, setMySignatureUpdate, setSignatures } from "../../slices/statementsSlice";

export function listenToSignatures(statementId: string): Unsubscribe {
    try {
     
        const dispatch = store.dispatch;
        const signaturesRef = doc(DB, Collections.documentsSigns, statementId);
       
        return onSnapshot(signaturesRef, (doc) => {
            try {
               
                if(!doc.exists()) return;
                const signaturesDB = doc.data() as DocumentSigns;
                
                DocumentSignsSchema.parse(signaturesDB);
                dispatch(setSignatures(signaturesDB));
            } catch (error) {
                console.error(error);
            }
        });

    } catch (error) {
        console.error(error);
        return () => { };
    }

}

export function listenToMySignature(statementId: string, ): Unsubscribe {
    try {
        console.log("listening to my signature", statementId);
        const user:User|null = store.getState().user.user;
        if(!user) throw new Error("User not found");

        const dispatch = store.dispatch;
        const signatureId = getStatementSubscriptionId(statementId, user);
        if(!signatureId) throw new Error("Signature Id not found");

        const signatureRef = doc(DB, Collections.signatures, signatureId);
        console.log(signatureId)
        return onSnapshot(signatureRef, (sigDB) => {
            try {
                console.log("sigDB.exists()",sigDB.exists())
                if(!sigDB.exists()) return;
                const signature = sigDB.data() as Signature;
                SignatureSchema.parse(signature);
                const isSigned = signature.signed;
                dispatch(setMySignature(signature));
                dispatch(setMySignatureUpdate({signed:isSigned, statementId}));
            } catch (error) {
                console.error(error);
            }
        });

    } catch (error) {
        console.error(error);
        return () => { };
    }

}