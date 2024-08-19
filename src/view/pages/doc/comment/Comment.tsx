import { AgreeDisagreeEnum, Statement } from "delib-npm";
import { FC, useState, useEffect } from "react";
import styles from "./Comment.module.scss";
import ThumbsUpIcon from "../../../../assets/icons/thumbUp.svg?react";
import MainButton from "../../../components/buttons/MainButton";
import ThumbsDownIcon from "../../../../assets/icons/thumbDown.svg?react";
import ProfileImage from "../../../components/profileImage/ProfileImage";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../controllers/slices/userSlice";
import { setAgreesToDB } from "../../../../controllers/db/agree/setAgrees";
import { listenToUserAgree } from "../../../../controllers/db/agree/getAgree";
import {
  selectAgree,
  updateAgree,
} from "../../../../controllers/slices/agreeSlice";

interface Props {
  statement: Statement;
}

const Comment: FC<Props> = ({ statement }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const agree = useSelector(selectAgree(statement.statementId));

  useEffect(() => {
    let unsub = () => {};

    unsub = listenToUserAgree(statement.statementId);

    return () => {
      unsub();
    };
  }, []);

  function handleAgree(_agree: AgreeDisagreeEnum) {
    let __agree = AgreeDisagreeEnum.NoOpinion;
    if (agree?.agree !== _agree) {
      __agree = _agree;
    } 
    dispatch(
      updateAgree({
        agree: __agree,
        statementId: statement.statementId,
      })
    );
    setAgreesToDB({ statement, agree: __agree });
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
          {statement.statement}<br />
          {statement.statementId}
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
                    agree?.agree === AgreeDisagreeEnum.Disagree
                      ? "white"
                      : "var(--icon-blue)"
                  }
                  backgroundColor={
                    agree?.agree === AgreeDisagreeEnum.Disagree
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
                  {statement.documentAgree?.disagree || 0}
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
                    agree?.agree === AgreeDisagreeEnum.Agree
                      ? "white"
                      : "var(--icon-blue)"
                  }
                  backgroundColor={
                    agree?.agree === AgreeDisagreeEnum.Agree
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
                  {statement.documentAgree?.agree || 0}
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
