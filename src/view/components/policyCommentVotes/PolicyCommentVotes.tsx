import MainButton from "../buttons/MainButton";
import StrongMainButton from "../buttons/StrongMainButton";
import AddComment from "../icons/AddComment";
import GreenLock from "../icons/GreenLock";
import ThumbsDown from "../icons/ThumbsDown";
import ThumbsUp from "../icons/ThumbsUp";
import styles from "./policyCommentVotes.module.scss";

type Props = {};

const PolicyCommentVotes = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      <img alt="Img" className={styles.wrapper__profileImage} />
      <div className={styles.wrapper__descriptionWrapper}>
        <div className={styles.wrapper__descriptionWrapper__nameWrapper}>
          <GreenLock/>
          <h2 className={styles.wrapper__descriptionWrapper__nameWrapper__name}>Saar sAAR</h2>
        </div>
        <p className={styles.wrapper__descriptionWrapper__description}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo
          quisquam debitis nesciunt perferendis suscipit optio culpa eum, qui
          voluptatum unde? Nemo nulla recusandae nam provident id aliquid sit ea
          doloribus!
        </p>
        <div className={styles.wrapper__descriptionWrapper__buttonsContainer}>
          <StrongMainButton width="9.70rem" height="1.88rem" padding="4px 16px" backgroundcolor="var(--active-btn)" color="#fff" fontSize="0.94rem" value="Add comment" icon=<AddComment/>/>
        <div className={styles.wrapper__descriptionWrapper__buttonsContainer__buttons}>
          <div className={styles.wrapper__descriptionWrapper__buttonsContainer__buttons__buttonWrapper}>
            <MainButton
              value="Disagree"
              color="var(--icon-blue)"
              backgroundcolor="var(--inactive-btn)"
              padding="0.23rem 1.41rem"
              width="7.47rem"
              height="1.88rem"
              fontSize="0.94rem"
              icon=<ThumbsDown color="var(--icon-blue)"/>
            />
            <p className={styles.wrapper__descriptionWrapper__buttonsContainer__buttons__buttonWrapper__text}>149</p>
          </div>
          <div className={styles.wrapper__descriptionWrapper__buttonsContainer__buttons__buttonWrapper}>
            <MainButton
              value="Agree"
              color="var(--icon-blue)"
              backgroundcolor="var(--inactive-btn)"
              padding="0.23rem 1.41rem"
              width="6.23rem"
              height="1.88rem"
              fontSize="0.94rem"
              icon=<ThumbsUp color="var(--icon-blue)"/>
            />
            <p className={styles.wrapper__descriptionWrapper__buttonsContainer__buttons__buttonWrapper__text}>389</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyCommentVotes;
