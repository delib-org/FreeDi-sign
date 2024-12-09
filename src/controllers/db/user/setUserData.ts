import { Collections, UserData } from "delib-npm";
import { store } from "../../../model/store";
import { doc, setDoc } from "firebase/firestore";
import { DB } from "../config";

export async function setUserDataToDB(userData: UserData): Promise<UserData | undefined> {
    try {
        const user = store.getState().user.user;
        if (!user) throw new Error("User not found");
        userData.userId = user.uid;
        if (!user) throw new Error("User not found");
        const userDataRef = doc(DB, Collections.usersData, user.uid);
        await setDoc(userDataRef, userData);
       
        return userData;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}