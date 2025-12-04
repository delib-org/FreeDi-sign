import styles from './ExpSuggestions.module.scss';
import SuggestionsCardImg from '../../../../../assets/images/comment.png';
import ExplainManImage1 from '../../../../../assets/images/explain-man1.png';
import OneIcon from '../../../../../assets/icons/one.svg?react';
import TwoIcon from '../../../../../assets/icons/two.svg?react';
import ArrowDownImage from '../../../../../assets/images/arrow-down.png';
import AddSuggestionImage from '../../../../../assets/images/addSuggestion.png';
import ExplainManImage2 from "../../../../../assets/images/explain-man2.png";
import Button from '../../../../components/buttons/button/Button';
import { ButtonType } from '../../../../../model/enumsModel';
import Modal from '../../../../components/modal/Modal';
import { useLobby } from '../../LobbyContext';

const ExpSuggestions = () => {

    const { setShowExplanation, showExplanation } = useLobby();

    if (!showExplanation) return null;

    function handleClose(){
        setShowExplanation(false);
    }

    return (
        <Modal show={showExplanation} setShow={handleClose}>
            <div className={styles["exp-suggestions"]}>
                <h2>איך להגיב למסמכים,להציע רעיונות ולתת משוב?</h2>
                <p>הכנסו למסמך, לחצו על תגובה, כמו בדוגמא הבאה</p>
                <div className={styles["exp-suggestions-content"]}>
                    <img className={styles["suggestion-card-example"]} src={SuggestionsCardImg} alt="Suggestion Card Example" />
                    <img className={styles["explaining-figure-1"]} src={ExplainManImage1} alt="Explaining figure 1" />
                    <OneIcon className={styles["one-icon"]} />
                    <div className={styles["explain1-text"]}>
                        כדי להגיב למסמך לחצו על <span>הוספת תגובה</span>
                    </div>
                    <img className={styles["arrow-down"]} src={ArrowDownImage} alt="arrow directing to next step" />
                    <img className={styles["add-suggestion"]} src={AddSuggestionImage} alt="Add suggestion in the comment" />
                    <img className={styles["explaining-figure-2"]} src={ExplainManImage2} alt="Explaining figure 2" />
                    <TwoIcon className={styles["two-icon"]} />
                    <div className={styles["explain2-text"]}>
                        וכתבו את  <span>התגובה</span> שלכם
                    </div>
                </div>
               
                <div className={styles['exp-suggestions-rules']}>
                <h2>חשוב שנפעל יחד לשמירה על כללי שיח משמעותי ומכבד בפלטפורמת שיתוף הציבור:</h2>

                <div>
                    <p><strong>1. שיח ענייני</strong> - התמקדו בתכנים ובנושאים שעולים לדיון תוך מיקוד בתועלת הכלל. הימנעו מהתייחסויות אישיות או מחוץ לנושא.</p>

                    <p><strong>2. אחריות משותפת</strong> - כל תגובה היא הזדמנות לבנות עתיד טוב יותר לגולן. כתבו מהמקום האישי, תוך הבנה שאנחנו חלק מקהילה משותפת.</p>

                    <p><strong>3. שיח מכבד</strong> - הגולן מגוון ובזה כוחו. נכבד זהויות, רקעים ודעות שונות גם כשאינם דומים לשלנו. תגובות פוגעניות או לא מכבדות -ימחקו.</p>

                    <p><strong>4. ביקורת בונה</strong> - שתפו אותנו בנקודות החוזק והחולשה של התכניות, והציעו דרכים לשיפורן.</p>
                </div>

                <p>אנו מאמינים כי שיתוף פעולה בין התושבים לבין המועצה הוא המפתח להצלחת התכניות ולפיתוח הגולן. מוזמנים להצטרף לשיח ולעשייה ולתרום לעתיד המשותף.</p>
                </div>
                <div className={`btns  ${styles["btns"]}`}>
                    <Button text="סגירה" buttonType={ButtonType.secondary} onClick={handleClose} />
                </div>
            </div>
        </Modal>
    )
}

export default ExpSuggestions