import { Collections, getStatementSubscriptionId, Signature, Statement } from "delib-npm";
import { store } from "../../../model/store";
import { DB } from "../config";
import { doc, setDoc } from "firebase/firestore";

interface setSignatureToDBProps {
    document: Statement;
    paragraphsLength: number;
    approved: number;
    signed: boolean;
}

export async function setSignatureToDB({ document, paragraphsLength, approved , signed}: setSignatureToDBProps): Promise<boolean> {
    try {
        const user = store.getState().user.user;
        if(!user) throw new Error("User not found");
        const userId = user.uid;
        const signatureId = getStatementSubscriptionId(document.statementId, user);
        if(!signatureId) throw new Error("Signature Id not found");
        const signature:Signature = {
            userId,
            documentId: document.statementId,
            date: new Date().toISOString(),
            levelOfSignature: approved/paragraphsLength,
            signatureId: signatureId,
            signed
        }

        const signatureRef = doc(DB, Collections.signatures, signatureId);
        await setDoc(signatureRef, signature);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}