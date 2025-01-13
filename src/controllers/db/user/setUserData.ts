import { Collections, getStatementSubscriptionId } from "delib-npm";
import { store } from "../../../model/store";
import { doc, setDoc } from "firebase/firestore";
import { firebaseDb } from "../config";

type UnknownObject = Record<string, unknown>;

interface UserObjectInterface {
    userId: string;
    documentId: string;
    [key: string]: unknown;
}

export async function setUserDataToDB(userData: UnknownObject, statementId: string|undefined): Promise<UserObjectInterface | undefined> {
    try {
        if(!statementId) throw new Error("Statement id is missing");
        if (!userData) throw new Error("User data not found");
        if (typeof userData !== "object") throw new Error("User data must be an object");
        const user = store.getState().user.user;
        if (!user) throw new Error("User not found");

        if (!user) throw new Error("User not found");

        const userDataId = getStatementSubscriptionId(statementId, user);
        if (!userDataId) throw new Error("User data id not found");

        const newData: UserObjectInterface = { ...userData, userId: user.uid, documentId: statementId };
        const userDataRef = doc(firebaseDb, Collections.usersData, userDataId);
        await setDoc(userDataRef, newData);

        return newData;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}