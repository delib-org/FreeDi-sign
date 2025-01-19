import { useSelector } from "react-redux"
import { selectUser } from "../../../controllers/slices/userSlice";
import DocumentCard from "./documentCard/DocumentCard";


const Lobby = () => {

    const documentsId = ["98cdcfbc-4f8c-4d29-81c7-57de12eefcce"];

    const userId = useSelector(selectUser)?.uid;

    return (
        <div>
            <h1>Lobby</h1>
            <p>Welcome to the Lobby, {userId}!</p>
            {documentsId.map((documentId) => (<DocumentCard key={documentId} documentId={documentId} />))}
        </div>
    )
}

export default Lobby