import { doc, increment, setDoc } from "firebase/firestore"
import { DB } from "../config"
import { Collections } from "delib-npm"
import { store } from "../../../model/store"

export function setViewToDB(statementId: string) {
    try {
        const user = store.getState().user.user;
        if (!user) throw new Error("User not found")
        const viewId = `${user.uid}--${statementId}`
        const viewRef = doc(DB, Collections.statementViews, viewId);
        setDoc(viewRef, { viewed: increment(1), lastViewed: new Date().getTime(), userId:user.uid, statementId }, { merge: true });

    } catch (error) {
        console.error(error)
    }
}