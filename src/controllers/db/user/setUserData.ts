import { Collections, getRandomUID, getStatementSubscriptionId } from "delib-npm";
import { store } from "../../../model/store";
import { doc, setDoc } from "firebase/firestore";
import { firebaseDb } from "../config";

type UnknownObject = Record<string, unknown>;

interface UserObjectInterface {
    userId: string;
    documentId: string;
    [key: string]: unknown;
}

interface SetUserDataToDBProps {
    userData: UnknownObject | undefined, documentId: string | undefined, eventType: string, targetText?: string, targetId?: string;
}
export async function setUserDataToDB({ 
    userData, 
    documentId, 
    eventType, 
    targetText,
    targetId,
}: SetUserDataToDBProps): Promise<UserObjectInterface | undefined> {
    try {
        //get lobby params from url
        const urlParams = new URLSearchParams(window.location.search);
        const lobbyId = urlParams.get('lobby') || userData?.lobbyId || "123";
        
        

        if (!documentId) throw new Error("Statement id is missing");
        if (!userData) throw new Error("User data not found");
        if (typeof userData !== "object") throw new Error("User data must be an object");
        const user = store.getState().user.user;
        if (!user) throw new Error("User not found");

        if (!user) throw new Error("User not found");
        const newData: UserObjectInterface = { ...userData, userId: user.uid, documentId, eventType };
        if (targetText) newData.target = targetText;
        if (targetId) newData.targetId = targetId;

        newData.timestamp = Date.now();
        newData.date = new Date().toLocaleString();
        if (lobbyId) newData.lobbyId = lobbyId;

        console.log("saving to DB", newData.lobbyId);

        if (eventType === "signup") {

            const userDataId = getStatementSubscriptionId(documentId, user);
            if (!userDataId) throw new Error("User data id not found");


            const userDataRef = doc(firebaseDb, Collections.usersData, userDataId);
            await setDoc(userDataRef, newData);

        } else {

            const userDataPointId = getRandomUID();
            const userDataRef = doc(firebaseDb, Collections.usersData, userDataPointId);
            await setDoc(userDataRef, newData);
        }
        console.log(newData)
        return newData;

    } catch (error) {
        console.error(error);
        return undefined;
    }
}