import { Collections, getStatementSubscriptionId, StatementSubscription, User } from "delib-npm";
import { store } from "../../../model/store";
import { doc, getDoc } from "firebase/firestore";
import { DB } from "../config";

export async function getSubscription(statementId:string):Promise<StatementSubscription|undefined>{
    try {
        const user = store.getState().user.user;
        if(!user) return undefined;
        const subscriptionId = getStatementSubscriptionId(statementId, user);
        if(!subscriptionId) return undefined;
        const subscriptionRef = doc(DB, Collections.statementsSubscribe, subscriptionId);
        const subscription = await getDoc(subscriptionRef);
        if(subscription.exists()){
            return subscription.data() as StatementSubscription;
        }
        return undefined;
    } catch (error) {
        console.error(error)
        return undefined;
    }
}