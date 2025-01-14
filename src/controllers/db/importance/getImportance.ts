import { Collections, getStatementSubscriptionId, Importance } from "delib-npm";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDb } from "../config";
import { store } from "../../../model/store";

export async function getImportanceFromDB(statementId: string,): Promise<Importance | undefined> {
    try {
        const user = store.getState().user.user;
        if(!user) throw new Error("User not logged in");

        const importanceId = getStatementSubscriptionId(statementId, user);
        if(!importanceId) throw new Error("ImportanceId not found");

        const importanceRef = doc(firebaseDb, Collections.importance, importanceId);
        const importanceDB = await getDoc(importanceRef);
        if(!importanceDB.exists()) return undefined;

        return importanceDB.data() as Importance;

    } catch (error) {
        console.error(error);
        return undefined;
    }
}