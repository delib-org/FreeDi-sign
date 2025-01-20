import { collection, query } from "firebase/firestore";
import { DocTOC } from "../../../model/docTOC";
import { firebaseDb } from "../config";
import { Collections } from "delib-npm";

// export async function getTableOfContent(documentId: string): Promise<DocTOC> {
//     try {
//         const firstLevelSectionsRef = collection(firebaseDb, Collections.statements);
//         const q = query(firstLevelSectionsRef, where("documentId", "==", documentId));
        
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// } 