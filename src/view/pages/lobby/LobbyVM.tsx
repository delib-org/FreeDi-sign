import { useState } from "react";

export function useLobbyVM(){
    const domain = window.location.hostname;
    const [showModal, setShowModal] = useState(false);

    function closeAccessabilityModal() {
        setShowModal(false);
    }

    const devDocumentsId = ["cefbfe74-e1f9-4f6d-ae24-d5799e33bdae"];
    const prodDocumentsId = ["9e17cb66-35d4-44e8-be42-0ffa7ea08c69", "eb8793c3-f38a-4b4f-ac3b-3d2d1da0a71d", "4183c45b-fa2f-4ba7-aff1-fd073a7dac7c", "70016470-ec30-41af-a28b-ca70802ac8af", "6432fe14-a187-4643-bf84-d217b7f47b5e"];
    const documentsId = domain === "localhost" ? devDocumentsId : prodDocumentsId;

    return {
        showModal,
        setShowModal,
        closeAccessabilityModal,
        documentsId
    }
}