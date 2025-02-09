import DocumentCard from "./documentCard/DocumentCard";
import styles from "./Lobby.module.scss";
import Modal from "../../components/modal/Modal";
import AccessabilityStatement from "../../components/accesability/AccessabilityStatement";
import LobbyAside from "./lobbyAside/LobbyAside";
import ExpSuggestions from "./explanation/expSuggestions/ExpSuggestions";
import { LobbyProvider } from './LobbyContext';
import ExplainButton from "./explanation/explainButton/ExplainButton";
import { useLobbyVM } from "./LobbyVM";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../controllers/slices/userSlice";
import { setUserDataToDB } from "../../../controllers/db/user/setUserData";
import { useParams } from "react-router-dom";


const LobbyContent = () => {
    const { documentsId, setShowModal, showModal, closeAccessabilityModal } = useLobbyVM();
    document.title = "Freedi | שיתוף גולן";
    const user = useSelector(selectUser);
    const {lobbyId} = useParams()||{lobbyId:false};
    const firstEnter = useRef(!localStorage.getItem("firstEnter"));

    useEffect(() => {
        
        if(user?.uid){
           
            if(firstEnter.current){
            
                setUserDataToDB({ userData: { unregister: true, lobbyId }, documentId: "lobby", eventType: "first-time-entered-browser" });
                firstEnter.current = false;
                localStorage.setItem("firstEnter", "true");
                return;
            }          
        
            setUserDataToDB({ userData: { name: user.displayName, email: user.email, lobbyId }, documentId: "lobby", eventType: "entered-from-within" });
        }
       
    }, [user, lobbyId]);

    return (

        <div className={styles.lobby}>
            <h1 className={styles.mobileHeader}>שיתוף ציבור - מועצה אזורית גולן</h1>
            <LobbyAside />
            <main>
                <div className="wrapper">
                    <h1 className={styles.desktopHeader}>שיתוף ציבור - מועצה אזורית גולן</h1>

                    <header>
                        <p>תושבות ותושבים יקרים,</p>

                        <p>בחודשים האחרונים הובלנו תהליך אסטרטגי מקיף לעיצוב עתיד הגולן.</p>

                        <p>במסע המשותף לקחו חלק תושבים, בעלי תפקידים ומנהיגות מהישובים, עובדי ומנהלי המועצה ומומחים בתחומים השונים. למדנו, חקרנו, ניתחנו נתונים וגיבשנו תוכניות עבודה בתחומי הביטחון והחירום, חינוך, הקהילה, הכלכלה והתשתיות.</p>

                        <p>רוצים להגיד את דעתכם? בדיוק על זה מדובר.</p>

                        <p>בטרם אישור סופי, אנו מזמינים אתכם להוסיף, לתת משוב, הארות, הערות ורעיונות על בסיס התכנית שנבנתה.</p>

                        <p>תוכלו להרחיב בנושאים שחשובים בעינכם, לתת הערות שחשוב שצוותי המימוש ייקח בחשבון, להוסיף רעיונות לחיבורים נוספים, והכי חשוב- תכירו את התכניות ותהיו שותפים להתפתחות הגולן.</p>

                        <p>באתר שלפניכם תוכלו לעיין בתוכניות האסטרטגיות ולהגיב - בין אם לכולן או רק לנושאים הקרובים לליבכם. התייחסותכם חשובה לנו והיא תילקח בחשבון בגיבוש התוכניות הסופיות.</p>

                        <p>אז איך משתתפים?</p>

                        <ul>
                            <li>בחרו את התחום/ים המעניינים אתכם</li>
                            <li>קראו את עיקרי התוכנית</li>
                            <li>שתפו בתובנות, רעיונות והצעות לשיפור</li>
                        </ul>

                        <p>יחד נעצב את עתיד הגולן!</p>
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
            <Modal show={showModal} setShow={() => closeAccessabilityModal()}>
                <AccessabilityStatement close={closeAccessabilityModal} />
            </Modal>

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