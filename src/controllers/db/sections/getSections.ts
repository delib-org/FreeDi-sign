import { Collections, DocumentType, Statement } from "delib-npm";
import { firebaseDb } from "../config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { DocTOC } from "../../../model/docTOC";
import { getStatement } from "../statements/getStatements";

export async function getDocumentTOC(documentId: string): Promise<DocTOC | undefined> {
    try {
        const firstLevelSectionsRef = collection(firebaseDb, Collections.statements);
        const q = query(firstLevelSectionsRef, where("documentSettings.parentDocumentId", "==", documentId), where("documentSettings.type", "==", DocumentType.section), orderBy("documentSettings.order"));
        const [document, sectionsDB] = await Promise.all([getStatement(documentId), getDocs(q)]);
        if (!document) throw new Error("Document not found");
        const sections = sectionsDB.docs.map((doc) => doc.data()) as Statement[];

        const toc = orderToTOC(document, sections);
        return toc;

    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export function orderToTOC(document: Statement, sections: Statement[]): DocTOC | undefined {
    try {


        const toc: DocTOC = {
            statementId: document.statementId,
            title: document.statement,
            children: [],
        };

        toc.children = sections
            .filter((section) => section.parentId === document.statementId && section.documentSettings?.type === DocumentType.section)
            .map((section) => ({
                statementId: section.statementId,
                title: section.statement,
                children: [],
            }));


        toc.children.forEach((child) => {
            child.children = sections
                .filter((section) => section.parentId === child.statementId && section.documentSettings?.type === DocumentType.section)
                .map((section) => ({
                    statementId: section.statementId,
                    title: section.statement,
                    children: [],
                }));

        });
        return toc;
    } catch (error) {
        console.error(error);
        return undefined;

    }
}