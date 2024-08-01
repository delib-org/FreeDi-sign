import { Statement } from "delib-npm";
import { FC, useState } from "react";
import styles from "./Comment.module.scss";
import ThumbsUpIcon from  '../../../../assets/icons/thumbUp.svg?react';
import MainButton from "../../../components/buttons/MainButton";
import ThumbsDownIcon from '../../../../assets/icons/thumbDown.svg?react';
import ProfileImage from "../../../components/profileImage/ProfileImage";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../controllers/slices/userSlice";
import { setEvaluationToDB } from "../../../../controllers/db/evaluations/setEvaluations";

interface Props {
  statement: Statement;
}


// need to get profile name from database
// need to get profile image from database
// need to get number of approve / reject from database

const Comment: FC<Props> = ({ statement }) => {
  const user = useSelector(selectUser);

  const [proCon, setProCon] = useState<"pro" | "con" | undefined>(undefined);
  const proColor = { background: "green", text: "white" };
  const conColor = { background: "red", text: "white" };

  function handleProConClick(proCon: "pro" | "con" | undefined) {
    setProCon(proCon);
    const evaluation = (() => {
      if (proCon === "pro") return 1;
      if (proCon === "con") return -1;
      return 0;
    })();
    setEvaluationToDB(statement, evaluation);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__profileImage}>
        <ProfileImage user={statement.creator} />
      </div>
      <div className={styles.wrapper__descriptionWrapper}>
        <div className={styles.wrapper__descriptionWrapper__nameWrapper}>
          <h2 className={styles.wrapper__descriptionWrapper__nameWrapper__name}>
            {statement.creator.displayName}
          </h2>
        </div>
        <p className={styles.wrapper__descriptionWrapper__description}>
          {statement.statement}<br></br>
          {statement.statementId}
        </p>
        <div className={styles.wrapper__descriptionWrapper__buttonsContainer}>
          {/* <StrongMainButton
            backgroundColor="var(--active-btn)"
            color="#fff"
            fontSize="0.94rem"
            value="Add comment"
            icon={<AddComment />}
          /> */}
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
                  color={proCon === "con" ? conColor.text : "var(--icon-blue)"}
                  backgroundColor={
                    proCon === "con"
                      ? conColor.background
                      : "var(--inactive-btn)"
                  }
                  icon={<ThumbsDownIcon />}
                  onClick={() =>
                    handleProConClick(proCon === "con" ? undefined : "con")
                  }
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
                  color={proCon === "pro" ? proColor.text : "var(--icon-blue)"}
                  backgroundColor={
                    proCon === "pro"
                      ? proColor.background
                      : "var(--inactive-btn)"
                  }
                  icon={<ThumbsUpIcon />}
                  onClick={() =>
                    handleProConClick(proCon === "pro" ? undefined : "pro")
                  }
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
