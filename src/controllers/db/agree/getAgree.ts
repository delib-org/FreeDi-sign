import { AgreeDisagree, Collections, getStatementSubscriptionId } from "delib-npm";
import { store } from "../../../model/store";
import { doc, onSnapshot } from "firebase/firestore";
import { DB } from "../config";
import { setAgree } from "../../slices/agreeSlice";

export function listenToUserAgree(statementId:string):()=>void{
    try {
        const user = store.getState().user.user;
        if (!user) throw new Error("User not found");
        const agreeId = getStatementSubscriptionId(statementId, user);
        if (!agreeId) throw new Error("Agree Id not found");

        const agreeRef = doc(DB, Collections.agrees, agreeId);
        const unsubscribe = onSnapshot(agreeRef, (doc) => {
            if (doc.exists()) {
                const agree = doc.data() as AgreeDisagree;
                store.dispatch(setAgree(agree));
            }
        });
        return unsubscribe;
    } catch (error) {
        console.error(error);
        return () => {};
    }
}