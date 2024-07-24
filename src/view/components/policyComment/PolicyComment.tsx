import MainButton from "../buttons/MainButton";
import StrongMainButton from "../buttons/StrongMainButton";
import styles from "./policyComment.module.scss";

interface Props {}

const PolicyComment = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      <img alt="Img" className={styles.wrapper__profileImage} />
      <form className={styles.wrapper__descriptionWrapper}>
        <textarea
          placeholder="Please, provide your thoughts in this space..."
          className={styles.wrapper__descriptionWrapper__description}
        />
        <div className={styles.wrapper__descriptionWrapper__buttonsWrapper}>
          <StrongMainButton
            value="Save comment"
            color="white"
            backgroundcolor="var(--active-btn)"
            padding="0.23rem 1.41rem"
            width="9.11rem"
            height="1.88rem"
            fontSize="0.94rem"
          />
          <MainButton
            value="Cancel"
            color="var(--icon-blue)"
            backgroundcolor="var(--inactive-btn)"
            padding="0.23rem 1.41rem"
            width="9.11rem"
            height="1.88rem"
            fontSize="0.94rem"
          />
        </div>
      </form>
    </div>
  );
};

export default PolicyComment;
