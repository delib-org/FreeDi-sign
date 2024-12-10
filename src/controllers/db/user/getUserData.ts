import { Collections, getStatementSubscriptionId, User, UserData, UserDataSchema } from "delib-npm";
import { doc, getDoc } from "firebase/firestore";
import { DB } from "../config";
import { store } from "../../../model/store";

export async function getUserData(userId:string|undefined, statementId:string|undefined): Promise<UserData | undefined> {
    try {

        if(!userId) userId = store.getState().user.user?.uid;
        if (!userId) throw new Error("couldn't get user id");
        if(!statementId) throw new Error("Statement id is missing");

        const user:User = {
            uid:userId,
            email:"",
            displayName:"",
            photoURL:""
        };
      
        const userDataId = getStatementSubscriptionId(statementId, user);
        if (!userDataId) throw new Error("User data id not found");

        const userDataRef = doc(DB, Collections.usersData, userDataId);
        const userDataDB = await getDoc(userDataRef);
        if (!userDataDB.exists()) return undefined;
        const userData = userDataDB.data() as UserData;
        const results = UserDataSchema.safeParse(userData);
        if (!results.success) {
            console.error(results.error);
            console.info(userData);
            return undefined;
        }
        return userData;
    } catch (error) {
        console.error(error);
        return undefined;        
    }
}