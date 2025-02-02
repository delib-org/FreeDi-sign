import { useState } from "react";

export function useLobbyVM(){
    const domain = window.location.hostname;
    const [showModal, setShowModal] = useState(false);

    function closeAccessabilityModal() {
        setShowModal(false);
    }

    const devDocumentsId = ["3d1eb8dc-c2e5-4e79-abc7-32da57148640", "54d61a65-cd99-4052-86c1-0bc8da619a0d"];
    const prodDocumentsId = ["4183c45b-fa2f-4ba7-aff1-fd073a7dac7c", "6432fe14-a187-4643-bf84-d217b7f47b5e", "9e17cb66-35d4-44e8-be42-0ffa7ea08c69", "eb8793c3-f38a-4b4f-ac3b-3d2d1da0a71d", "70016470-ec30-41af-a28b-ca70802ac8af"];
    const documentsId = domain === "localhost" ? devDocumentsId : prodDocumentsId;

    return {
        showModal,
        setShowModal,
        closeAccessabilityModal,
        documentsId
    }
}