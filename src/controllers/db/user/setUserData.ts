import { Collections } from "delib-npm";
import { store } from "../../../model/store";
import { doc, setDoc } from "firebase/firestore";
import { DB } from "../config";

type UnknownObject = Record<string, unknown>;

interface UserObjectInterface {
    userId: string;
    [key: string]: unknown;
}

export async function setUserDataToDB(userData: UnknownObject): Promise<UserObjectInterface | undefined> {
    try {
        if(!userData) throw new Error("User data not found");
        if(typeof userData !== "object") throw new Error("User data must be an object");
        const user = store.getState().user.user;
        if (!user) throw new Error("User not found");
       
        if (!user) throw new Error("User not found");
        const newData:UserObjectInterface = {...userData, userId:user.uid};
        const userDataRef = doc(DB, Collections.usersData, user.uid);
        await setDoc(userDataRef, newData);
       
        return newData;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}