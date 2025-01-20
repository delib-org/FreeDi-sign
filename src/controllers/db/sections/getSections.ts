import { Collections, DocumentType, Statement } from "delib-npm";
import { firebaseDb } from "../config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { DocTOC } from "../../../model/docTOC";
import { getStatement } from "../statements/getStatements";
import { store } from "../../../model/store";
import { setStatements } from "../../slices/statementsSlice";

export async function getDocumentTOC(documentId: string): Promise<DocTOC | undefined> {
    try {
        const dispatch = store.dispatch;
        const firstLevelSectionsRef = collection(firebaseDb, Collections.statements);
        const q = query(firstLevelSectionsRef, where("documentSettings.parentDocumentId", "==", documentId), where("documentSettings.type", "==", DocumentType.section), orderBy("documentSettings.order"));
        const [document, sectionsDB] = await Promise.all([getStatement(documentId), getDocs(q)]);
        if (!document) throw new Error("Document not found");
        const sections = sectionsDB.docs.map((doc) => doc.data()) as Statement[];

        dispatch(setStatements([document,...sections]));

        const toc = orderToTOC(document, sections);
        return toc;

    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export function orderToTOC(document: Statement, sections: Statement[]): DocTOC | undefined {
    const altImage = "https://media.licdn.com/dms/image/v2/C5612AQEr3WmxhGSbxg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1644862734630?e=2147483647&v=beta&t=M5AxxQvXksyGDUNYiIyZ7G0zAhfqdmYgrlQhMdTkLfI";
    const image = document.imagesURL?.main || altImage;
    try {
        const toc: DocTOC = {
            image,
            statementId: document.statementId,
            title: document.statement,
            children: [],
        };

        toc.children = sections
            .filter((section) => section.parentId === document.statementId && section.documentSettings?.type === DocumentType.section)
            .map((section) => ({
                image,
                statementId: section.statementId,
                title: section.statement,
                children: [],
            }));


        toc.children.forEach((child) => {
            child.children = sections
                .filter((section) => section.parentId === child.statementId && section.documentSettings?.type === DocumentType.section)
                .map((section) => ({
                    image,
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