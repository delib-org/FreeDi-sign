import DocumentCard from "./documentCard/DocumentCard";
import styles from "./Lobby.module.scss";
import Modal from "../../components/modal/Modal";
import AccessabilityStatement from "../../components/accesability/AccessabilityStatement";
import { useState } from "react";
import LobbyAside from "./lobbyAside/LobbyAside";
import ExpSuggestions from "./explanation/expSuggestions/ExpSuggestions";
import { LobbyProvider } from './LobbyContext';
import ExplainButton from "./explanation/explainButton/ExplainButton";


const LobbyContent = () => {
    const domain = window.location.hostname;
    const [showModal, setShowModal] = useState(false);

    function closeAccessabilityModal() {
        setShowModal(false);
    }

    const devDocumentsId = ["98cdcfbc-4f8c-4d29-81c7-57de12eefcce", "5b6b7c59-82a6-4cf5-9928-c4daef1acc31", "5b6b7c59-82a6-4cf5-9928-c4daef1acc31", "98cdcfbc-4f8c-4d29-81c7-57de12eefcce", "98cdcfbc-4f8c-4d29-81c7-57de12eefcce"];
    const prodDocumentsId = ["4183c45b-fa2f-4ba7-aff1-fd073a7dac7c", "6432fe14-a187-4643-bf84-d217b7f47b5e", "9e17cb66-35d4-44e8-be42-0ffa7ea08c69"];
    const documentsId = domain === "localhost" ? devDocumentsId : prodDocumentsId;
    document.title = "Freedi | שיתוף גולן";


    return (

        <div className={styles.lobby}>
            <h1 className={styles.mobileHeader}>שיתוף ציבור - מועצה אזורית גולן</h1>
            <LobbyAside />
            <main>
                <div className="wrapper">
                    <h1 className={styles.desktopHeader}>שיתוף ציבור - מועצה אזורית גולן</h1>

                    <header>
                        <p>ברוכים הבאים למערכת שיתוף הציבור של המועצה האזורית גולן!</p>

                        <p>לפניכם חמש התוכניות האסטרטגיות שגובשו בשיתוף תושבי הגולן, אנשי המקצוע והמועצה. יחד נפעל למימושן בשנים הקרובות.</p>

                        <p>אתם מוזמנים לקחת חלק פעיל בתהליך:</p>
                        <ul>
                            <li>הציעו רעיונות לשיפור התוכניות</li>
                            <li>הביעו את מידת הסכמתכם עם הצעות השיפור שהועלו במערכת</li>
                        </ul>
                        <div className={`btns ${styles.learnToSuggest}`}>
                            <ExplainButton />
                        </div>
                    </header>
                    <div className={styles['lobby-wrapper']}>
                        {documentsId.map((documentId) => (<DocumentCard key={`${Math.random()}-${documentId}`} documentId={documentId} />))}
                    </div>
                    <footer className={styles.footer}>
                        <a href="https://freedi.co" target="_blank"> פותח על ידי פרידי הסכמות בע"מ</a>
                        <button onClick={() => setShowModal(true)}>הצהרת נגישות</button>
                    </footer>
                </div>
            </main>
            {showModal && <Modal close={closeAccessabilityModal}>
                <AccessabilityStatement close={closeAccessabilityModal} />
            </Modal>}

            <ExpSuggestions />

        </div>

    )
}

const Lobby = () => {
    return (
        <LobbyProvider>
            <LobbyContent />
        </LobbyProvider>
    );
};

export default Lobby