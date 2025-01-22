import DocumentCard from "./documentCard/DocumentCard";
import styles from "./Lobby.module.scss";
import Modal from "../../components/modal/Modal";
import AccessabilityStatement from "../../components/accesability/AccessabilityStatement";
import { useState } from "react";
import LobbyAside from "./lobbyAside/LobbyAside";
import ExpSuggestions from "./explanation/expSuggestions/ExpSuggestions";
import { LobbyProvider, useLobby } from './LobbyContext';
import ExplainButton from "./explanation/explainButton/ExplainButton";

const LobbyContent = () => {

    const { showExplanation, setShowExplanation } = useLobby();
    const [showModal, setShowModal] = useState(false);
    console.log("showExplanation in Lobby", showExplanation)

    function handleShowExplanation() {
        setShowExplanation(true);
    }

    function closeAccessabilityModal() {
        setShowModal(false);
    }

    const documentsId = ["98cdcfbc-4f8c-4d29-81c7-57de12eefcce", "5b6b7c59-82a6-4cf5-9928-c4daef1acc31", "5b6b7c59-82a6-4cf5-9928-c4daef1acc31", "98cdcfbc-4f8c-4d29-81c7-57de12eefcce", "98cdcfbc-4f8c-4d29-81c7-57de12eefcce"];
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