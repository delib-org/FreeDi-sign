import DocumentCard from "./documentCard/DocumentCard";
import styles from "./Lobby.module.scss";
import Modal from "../../components/modal/Modal";
import AccessabilityStatement from "../../components/accesability/AccessabilityStatement";
import LobbyAside from "./lobbyAside/LobbyAside";
import ExpSuggestions from "./explanation/expSuggestions/ExpSuggestions";
import { LobbyProvider } from './LobbyContext';
import ExplainButton from "./explanation/explainButton/ExplainButton";
import { useLobbyVM } from "./LobbyVM";


const LobbyContent = () => {
    const { documentsId, setShowModal, showModal, closeAccessabilityModal } = useLobbyVM();
    document.title = "Freedi | שיתוף גולן";

    return (

        <div className={styles.lobby}>
            <h1 className={styles.mobileHeader}>שיתוף ציבור - מועצה אזורית גולן</h1>
            <LobbyAside />
            <main>
                <div className="wrapper">
                    <h1 className={styles.desktopHeader}>שיתוף ציבור - מועצה אזורית גולן</h1>

                    <header>
                        <p>תושבות ותושבים יקרים,</p>

                        <p>בחודשים האחרונים הובלנו תהליך אסטרטגי מקיף לעיצוב עתיד הגולן. לתהליך היו שותפים רבים מהמועצה, מהציבור ומהאזור. למדנו, חקרנו, ניתחנו נתונים וגיבשנו תוכניות בתחומי הביטחון והחירום, חינוך, הקהילה, הכלכלה והתשתיות.</p>

                        <p>כעת, בטרם אישור סופי, אנו מזמינים אתכם להיות שותפים ולהשפיע על התוכניות שיעצבו את עתיד האזור שלנו.</p>

                        <p>באתר שלפניכם תוכלו לעיין בתוכניות האסטרטגיות ולהגיב - בין אם לכולן או רק לנושאים הקרובים לליבכם. התייחסותכם חשובה לנו והיא תילקח בחשבון בגיבוש התוכניות הסופיות.</p>

                        <p>איך משתתפים?</p>
                        <p>
                            - בחרו את התחום/ים המעניינים אתכם<br />
                            - קראו את עיקרי התוכנית<br />
                            - שתפו בתובנות, רעיונות והצעות לשיפור<br />
                            - הגיבו עד לתאריך ....
                        </p>

                        <p>יחד נעצב את עתיד הגולן.</p>
                        <div className={`btns ${styles.learnToSuggest}`}>
                            <ExplainButton />
                        </div>
                    </header>
                    <div className={styles['lobby-wrapper']}>
                        {documentsId.map((documentId) => (<DocumentCard key={`${Math.random()}-${documentId}`} documentId={documentId} hasTOC={false} />))}
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