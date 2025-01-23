import { useState } from "react";

export function useLobbyVM(){
    const domain = window.location.hostname;
    const [showModal, setShowModal] = useState(false);

    function closeAccessabilityModal() {
        setShowModal(false);
    }

    const devDocumentsId = ["98cdcfbc-4f8c-4d29-81c7-57de12eefcce", "5b6b7c59-82a6-4cf5-9928-c4daef1acc31", "5b6b7c59-82a6-4cf5-9928-c4daef1acc31", "98cdcfbc-4f8c-4d29-81c7-57de12eefcce", "98cdcfbc-4f8c-4d29-81c7-57de12eefcce"];
    const prodDocumentsId = ["4183c45b-fa2f-4ba7-aff1-fd073a7dac7c", "6432fe14-a187-4643-bf84-d217b7f47b5e", "9e17cb66-35d4-44e8-be42-0ffa7ea08c69"];
    const documentsId = domain === "localhost" ? devDocumentsId : prodDocumentsId;

    return {
        showModal,
        setShowModal,
        closeAccessabilityModal,
        documentsId
    }
}