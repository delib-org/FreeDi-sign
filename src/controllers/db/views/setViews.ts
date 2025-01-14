import { doc, increment, setDoc } from "firebase/firestore"
import { firebaseDb } from "../config"
import { Collections, Statement } from "delib-npm"
import { store } from "../../../model/store"

export function setViewToDB(statement: Statement | undefined) {
    try {
        if (!statement) throw new Error("Statement not found")
        const { statementId, documentSettings } = statement;
   
        if (!documentSettings) throw new Error("Document settings not found")
        const { parentDocumentId } = documentSettings;
        if (!parentDocumentId) throw new Error("Parent document id not found")

        const user = store.getState().user.user;
        if (!user) throw new Error("User not found")
        const viewId = `${user.uid}--${statementId}`
        const viewRef = doc(firebaseDb, Collections.statementViews, viewId);
        
        setDoc(viewRef, { viewed: increment(1), lastViewed: new Date().getTime(), userId: user.uid, statementId, parentDocumentId }, { merge: true });

    } catch (error) {
        console.error(error)
    }
}