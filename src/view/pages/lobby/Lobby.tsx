import { useSelector } from "react-redux"
import { selectUser } from "../../../controllers/slices/userSlice";
import DocumentCard from "./documentCard/DocumentCard";
import styles from "./Lobby.module.scss";
import Modal from "../../components/modal/Modal";
import AccessabilityStatement from "../../components/accesability/AccessabilityStatement";
import { useState } from "react";


const Lobby = () => {
    const [showModal, setShowModal] = useState(false);

    function closeAccessabilityModal() {
        setShowModal(false);
    }

    const documentsId = ["98cdcfbc-4f8c-4d29-81c7-57de12eefcce", "5b6b7c59-82a6-4cf5-9928-c4daef1acc31", "5b6b7c59-82a6-4cf5-9928-c4daef1acc31", "98cdcfbc-4f8c-4d29-81c7-57de12eefcce", "98cdcfbc-4f8c-4d29-81c7-57de12eefcce"];

    const userId = useSelector(selectUser)?.uid;

    return (
        <div className={styles.lobby}>
            <header>
                <h1>שיתוף ציבור - מועצה אזורית גולן</h1>
                <p>Welcome to the Lobby, {userId}!</p>
                <p>ברוכים הבאים למערכת שיתוך הציבור של רמת הגולן</p>
                <p>במערכת זאת, תוכלו לצפות בתוכנית החומש שפותחה על ידי התושבים שהצטרפו להתהליך גיבוש תוכנית החומש, ותוכלו להציע הצעות לשיפור.
                </p>
                <p>להלן 5 תוכניות שפותחו על ידי התושבים.</p>
                <p>תוכלו להשפיע באמצעות הצעת הצעות לשיפור, ובאמצעות תמיכה או ההתנגדות להצעות שאחרים הציעו.
                </p>
            </header>
            <main className={styles['lobby-wrapper']}>
                {documentsId.map((documentId) => (<DocumentCard key={`${Math.random()}-${documentId}`} documentId={documentId} />))}
            </main>
            <footer className={styles.footer}>
                <a href="https://freedi.co" target="_blank"> פותח על ידי פרידי הסכמות בע"מ</a>
                <button onClick={()=>setShowModal(true)}>הצהרת נגישות</button>
            </footer>
            {showModal && <Modal close={closeAccessabilityModal}>
                <AccessabilityStatement close={closeAccessabilityModal}/>
            </Modal>}
        </div>
    )
}

export default Lobby