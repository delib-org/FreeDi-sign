import { SignatureType, Statement } from "delib-npm";
import { getSignature } from "../../../controllers/db/sign/getSignature";
import { setSignatureToDB } from "../../../controllers/db/sign/setSignature";


export async function handleSetUserEnteredPage(statement: undefined | Statement, paragraphsLength: number, approved: number) {
    try {

        if (!statement) throw new Error("Document Id not found");
        const signature = await getSignature({ documentId: statement?.statementId });
        if (!signature) {
            setSignatureToDB({ document: statement, paragraphsLength, approved, signed: SignatureType.viewed })
        }


    } catch (error) {
        console.error(error);
    }
}