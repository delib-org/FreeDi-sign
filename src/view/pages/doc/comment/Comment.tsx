import { Statement } from "delib-npm";
import { FC } from "react";
import styles from "./Comment.module.scss";
import ThumbsUpIcon from "../../../components/icons/ThumbsUpIcon";
import MainButton from "../../../components/buttons/MainButton";
import ThumbsDownIcon from "../../../components/icons/ThumbsDownIcon";
import StrongMainButton from "../../../components/buttons/StrongMainButton";
import AddComment from "../../../components/icons/AddCommentIcon";

interface Props {
  statement: Statement;
}

// need to get profile name from database
// need to get profile image from database
// need to get number of approve / reject from database

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
            backgroundColor="var(--active-btn)"
            color="#fff"
            fontSize="0.94rem"
            value="Add comment"
            icon={<AddComment />} 
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
                backgroundColor="var(--inactive-btn)"
                padding="0.23rem 1.41rem"
                height="1.88rem"
                fontSize="0.94rem"
                icon={<ThumbsDownIcon color="var(--icon-blue)" />} 
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
                backgroundColor="var(--inactive-btn)"
                padding="0.23rem 1.41rem"
                height="1.88rem"
                fontSize="0.94rem"
                icon={<ThumbsUpIcon color="var(--icon-blue)" />} 
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
