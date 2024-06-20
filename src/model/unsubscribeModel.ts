import { Unsubscribe } from "firebase/firestore";

export interface UnsubscribeObject {
    unsubFunction:Unsubscribe;
    statementId:string;
}