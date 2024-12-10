import { doc, getDoc } from "firebase/firestore";
import { store } from "../../../model/store";
import { Collections, getStatementSubscriptionId, Signature } from "delib-npm";
import { DB } from "../config";

export async function getSignature({ documentId }: { documentId: string|undefined }): Promise<Signature|undefined> {
    try {
        if(!documentId) throw new Error("Document Id not found");
        const user = store.getState().user.user;
        if(!user) throw new Error("User not found");
        const signatureId = getStatementSubscriptionId(documentId, user);
        if(!signatureId) throw new Error("Signature Id not found");

        const signatureRef = doc(DB, Collections.signatures, signatureId);
        const signatureDB = await getDoc(signatureRef);
        if (!signatureDB.exists()) {
            return undefined;
        }
        const signature = signatureDB.data() as Signature;
        return signature
    } catch (error) {
        console.error(error);
        return undefined;
    }
}