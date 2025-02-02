import { useEffect, useState } from "react";

import { getDocumentTOC } from "../../../../controllers/db/sections/getSections";
import { useSelector } from "react-redux";
import { selectTOC } from "../../../../controllers/slices/tocSlice";

export function useDocumentCard(statementId: string, hasTOC?: boolean) {

    const docTOC = useSelector(selectTOC(statementId));
    const [loading, setLoading] = useState(false);
    const [triedToFetchSections, setTriedToFetchSections] = useState(false);


    useEffect(() => {

        if (!triedToFetchSections && !docTOC) {
            setTriedToFetchSections(true);
            setLoading(true);
            getDocumentTOC(statementId, hasTOC).then(() => {
                setLoading(false);
            }).catch((error) => {
                console.error(error);
                setLoading(false);
            });
        }

    }, [docTOC])



    return { docTOC, loading }
}