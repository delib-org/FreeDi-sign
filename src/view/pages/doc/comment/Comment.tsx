import { AgreeDisagreeEnum, Statement } from "delib-npm";
import { FC, useState } from "react";
import styles from "./Comment.module.scss";
import ThumbsUpIcon from "../../../../assets/icons/thumbUp.svg?react";
import MainButton from "../../../components/buttons/MainButton";
import ThumbsDownIcon from "../../../../assets/icons/thumbDown.svg?react";
import ProfileImage from "../../../components/profileImage/ProfileImage";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../controllers/slices/userSlice";
import { setAgreesToDB } from "../../../../controllers/db/agree/setAgrees";

interface Props {
  statement: Statement;
}

const Comment: FC<Props> = ({ statement }) => {
  const user = useSelector(selectUser);

  const [agree, setAgree] = useState<AgreeDisagreeEnum>(
    AgreeDisagreeEnum.NoOpinion
  );

  function handleAgree(_agree: AgreeDisagreeEnum) {

    if(agree === _agree) {
      setAgree(AgreeDisagreeEnum.NoOpinion);
      _agree = AgreeDisagreeEnum.NoOpinion;
    }
    setAgree(_agree);

    setAgreesToDB({ statement, agree:_agree });
  }

  const isAuthor = user?.uid === statement.creatorId;

  return (
    <div className={styles.wrapper}>
      {isAuthor && (
        <div className={styles.wrapper__profileImage}>
          <ProfileImage user={statement.creator} />
        </div>
      )}
      <div className={styles.wrapper__descriptionWrapper}>
        <div className={styles.wrapper__descriptionWrapper__nameWrapper}></div>
        <p className={styles.wrapper__descriptionWrapper__description}>
          {statement.statement}
        </p>
        <div className={styles.wrapper__descriptionWrapper__buttonsContainer}>
          <div />
          {user?.uid !== statement.creatorId && (
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
                  color={
                    agree === AgreeDisagreeEnum.Disagree
                      ? "white"
                      : "var(--icon-blue)"
                  }
                  backgroundColor={
                    agree === AgreeDisagreeEnum.Disagree
                      ? "var(--reject)"
                      : "var(--inactive-btn)"
                  }
                  icon={<ThumbsDownIcon />}
                  onClick={() => handleAgree(AgreeDisagreeEnum.Disagree)}
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
                  color={
                    agree === AgreeDisagreeEnum.Agree
                      ? "white"
                      : "var(--icon-blue)"
                  }
                  backgroundColor={
                    agree === AgreeDisagreeEnum.Agree
                      ? "var(--agree)"
                      : "var(--inactive-btn)"
                  }
                  icon={<ThumbsUpIcon />}
                  onClick={() => handleAgree(AgreeDisagreeEnum.Agree)}
                />
                <p
                  className={
                    styles.wrapper__descriptionWrapper__buttonsContainer__buttons__buttonWrapper__text
                  }
                >
                  379
                </p>
              </div>
            </div>
          )}
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
