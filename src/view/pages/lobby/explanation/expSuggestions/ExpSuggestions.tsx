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

    return (
        <Modal onClick={() => setShowExplanation(false)} close={() => setShowExplanation(false)}>
            <div className={styles["exp-suggestions"]}>
                <h2>איך להגיב למסמכים,להציע רעיונות ולתת משוב?</h2>
                <p>הכנסו למסמך, בחרו פסקה...</p>
                <div className={styles["exp-suggestions-content"]}>
                    <img className={styles["suggestion-card-example"]} src={SuggestionsCardImg} alt="Suggestion Card Example" />
                    <img className={styles["explaining-figure-1"]} src={ExplainManImage1} alt="Explaining figure 1" />
                    <OneIcon className={styles["one-icon"]} />
                    <div className={styles["explain1-text"]}>
                        כדי להגיב למסמך לחצו על <span>תגובה</span>
                    </div>
                    <img className={styles["arrow-down"]} src={ArrowDownImage} alt="arrow directing to next step" />
                    <img className={styles["add-suggestion"]} src={AddSuggestionImage} alt="Add suggestion in the comment" />
                    <img className={styles["explaining-figure-2"]} src={ExplainManImage2} alt="Explaining figure 2" />
                    <TwoIcon className={styles["two-icon"]} />
                    <div className={styles["explain2-text"]}>
                        וכתבו את הצעת <span>השיפור</span> שלכם
                    </div>
                </div>
                <div className={`btns  ${styles["btns"]}`}>
                    <Button text="סגירה" buttonType={ButtonType.secondary} />
                </div>
            </div>
        </Modal>
    )
}

export default ExpSuggestions