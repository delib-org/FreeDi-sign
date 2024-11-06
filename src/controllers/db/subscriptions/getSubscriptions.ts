import { Collections, getStatementSubscriptionId, StatementSubscription} from "delib-npm";
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
       
        const subscriptionDB = await getDoc(subscriptionRef);
   
        if(subscriptionDB.exists()){
            return subscriptionDB.data() as StatementSubscription;
        }
        return undefined;
    } catch (error) {
        console.error(error)
        return undefined;
    }
}