import { useEffect, useState } from "react";
import { DocTOC } from "../../../../model/docTOC";
import { getDocumentTOC } from "../../../../controllers/db/sections/getSections";

export function useDocumentCard(statementId: string) {
   
    const [docTOC, setDocTOC] = useState<DocTOC | null>(null);
    const [loading, setLoading] = useState(false);
    const [triedToFetchSections, setTriedToFetchSections] = useState(false);


    useEffect(() => {

        if (!triedToFetchSections && !docTOC) {
            setTriedToFetchSections(true);
            setLoading(true);
            getDocumentTOC(statementId).then((toc) => {
                if(!toc) return;
                setDocTOC(toc);
                setLoading(false);
            }).catch((error) => {
                console.error(error);
                setLoading(false);
            });

        }

    }, [docTOC])



    return { docTOC, loading }
}