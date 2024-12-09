import { Collections, UserData, UserDataSchema } from "delib-npm";
import { doc, getDoc } from "firebase/firestore";
import { DB } from "../config";
import { store } from "../../../model/store";

export async function getUserData(userId?:string): Promise<UserData | undefined> {
    try {
        if(!userId) userId = store.getState().user.user?.uid;
        if (!userId) throw new Error("couldn't get user id");
      
        const userDataRef = doc(DB, Collections.usersData, userId);
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