import { Statement } from "delib-npm";
import { FC } from "react";
import styles from "./Comment.module.scss";
import ThumbsUp from "../../../components/icons/ThumbsUp";
import MainButton from "../../../components/buttons/MainButton";
import ThumbsDown from "../../../components/icons/ThumbsDown";
import StrongMainButton from "../../../components/buttons/StrongMainButton";
import AddComment from "../../../components/icons/AddComment";

interface Props {
  statement: Statement;
}
const Comment: FC<Props> = ({ statement }) => {
  return (
    <div className={styles.wrapper}>
      <img alt="Img" className={styles.wrapper__profileImage} />
      <div className={styles.wrapper__descriptionWrapper}>
        <div className={styles.wrapper__descriptionWrapper__nameWrapper}>
          <h2 className={styles.wrapper__descriptionWrapper__nameWrapper__name}>
            Saar sAAR
          </h2>
        </div>
        <p className={styles.wrapper__descriptionWrapper__description}>
          {statement.statement}
        </p>
        <div className={styles.wrapper__descriptionWrapper__buttonsContainer}>
          <StrongMainButton
            width="9.70rem"
            height="1.88rem"
            padding="4px 16px"
            backgroundcolor="var(--active-btn)"
            color="#fff"
            fontSize="0.94rem"
            value="Add comment"
            icon={<AddComment />} // Corrected JSX syntax
          />
          <div
            className={
              styles.wrapper__descriptionWrapper__buttonsContainer__buttons
            }
          >
            <div
              className={
                styles.wrapper__descriptionWrapper__buttonsContainer__buttons__buttonWrapper
              }
            >
              <MainButton
                value="Disagree"
                color="var(--icon-blue)"
                backgroundcolor="var(--inactive-btn)"
                padding="0.23rem 1.41rem"
                width="7.47rem"
                height="1.88rem"
                fontSize="0.94rem"
                icon={<ThumbsDown color="var(--icon-blue)" />} // Corrected JSX syntax
              />
              <p
                className={
                  styles.wrapper__descriptionWrapper__buttonsContainer__buttons__buttonWrapper__text
                }
              >
                149
              </p>
            </div>
            <div
              className={
                styles.wrapper__descriptionWrapper__buttonsContainer__buttons__buttonWrapper
              }
            >
              <MainButton
                value="Agree"
                color="var(--icon-blue)"
                backgroundcolor="var(--inactive-btn)"
                padding="0.23rem 1.41rem"
                width="6.23rem"
                height="1.88rem"
                fontSize="0.94rem"
                icon={<ThumbsUp color="var(--icon-blue)" />} // Corrected JSX syntax
              />
              <p
                className={
                  styles.wrapper__descriptionWrapper__buttonsContainer__buttons__buttonWrapper__text
                }
              >
                389
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className={styles.comment}>
    //   <div className={styles.comment__approval}>
    //     <p>comment: {statement.statement}</p>
    //     <div className={styles.comment__approval__buttons}>
    //       <button>Approve</button>
    //       <button>Reject</button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Comment;
