import { Collections, Segmentation } from "delib-npm";
import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import { DB } from "../config";

export async function getSegments(documentId: string):Promise<Segmentation[]>{
    try{
        console.warn("need to change to the specific document id:", documentId);
        documentId = "f786189e-5158-468c-a75d-ad2b4855249c"; // TODO: remove this line after the admin can set for each statement the segmentation
    const segmentsRef = collection(DB, Collections.statementSegments);
    const q = query(segmentsRef, where('statementId', '==', documentId));
    const segmentsDB = await getDocs(q);
    const segments = segmentsDB.docs.map((doc:DocumentData) => doc.data() as Segmentation);
    console.log("segments", segments);
    return segments.sort((a,b)=>a.order-b.order);

    }catch(e){
        console.error(e);
        return [];
    }
}