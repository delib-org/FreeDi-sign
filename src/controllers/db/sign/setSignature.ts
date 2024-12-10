import { Collections, getStatementSubscriptionId, Signature, SignatureSchema, SignatureType, Statement } from "delib-npm";
import { store } from "../../../model/store";
import { DB } from "../config";
import { doc, setDoc } from "firebase/firestore";
import { setMySignature } from "../../slices/statementsSlice";

interface setSignatureToDBProps {
    document: Statement;
    paragraphsLength: number;
    approved: number;
    signed: SignatureType;
}

export async function setSignatureToDB({ document, paragraphsLength, approved, signed }: setSignatureToDBProps): Promise<boolean> {
    try {
        if(paragraphsLength === 0) paragraphsLength = 1;
        const dispatch = store.dispatch;
        const user = store.getState().user.user;
        if (!user) throw new Error("User not found");
        const userId = user.uid;
        const signatureId = getStatementSubscriptionId(document.statementId, user);
        if (!signatureId) throw new Error("Signature Id not found");
        const signature: Signature = {
            userId,
            documentId: document.statementId,
            date: new Date().toISOString(),
            levelOfSignature: signed === SignatureType.signed ? (approved / paragraphsLength) : 0,
            signatureId: signatureId,
            signed
        }

        const results = SignatureSchema.safeParse(signature);
        if (!results.success) throw new Error(JSON.stringify(results.error));

        dispatch(setMySignature(signature));

        const signatureRef = doc(DB, Collections.signatures, signatureId);
        await setDoc(signatureRef, signature);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

