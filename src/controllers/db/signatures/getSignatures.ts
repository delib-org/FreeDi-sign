import { Unsubscribe } from "firebase/auth";
import { DB } from "../config";
import { Collections, DocumentSigns, DocumentSignsSchema } from "delib-npm";
import { onSnapshot, doc } from "firebase/firestore";
import { store } from "../../../model/store";
import { setSignatures } from "../../slices/statementsSlice";

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