import React, { FC, SetStateAction } from "react";

// Third Party Imports
import { Statement } from "delib-npm";
import { setEvaluationToDB } from "../../../../../controllers/db/evaluations/setEvaluations";
// Assets
import LikeIcon from "../../../../../assets/icons/simpleLike/full/like.svg?react";
import DislikeIcon from "../../../../../assets/icons/simpleLike/full/dislike.svg?react";

// Statement helpers

import styles from "./Thumb.module.scss";
import { setUserDataToDB } from "../../../../../controllers/db/user/setUserData";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../../../controllers/slices/userSlice";

interface ThumbProps {
  evaluation: number;
  upDown: "up" | "down";
  statement: Statement;
  setConVote: React.Dispatch<SetStateAction<number>>;
  setProVote: React.Dispatch<SetStateAction<number>>;
}

const Thumb: FC<ThumbProps> = ({
  evaluation,
  upDown,
  statement,
  setConVote,
  setProVote,
}) => {
  const userData = useSelector(selectUserData);
  const handleVote = (isUp: boolean) => {
    if (isUp) {
      setUserDataToDB({ userData, documentId: statement.documentSettings?.parentDocumentId, eventType: "like-pro", targetText: statement.statement, targetId: statement.statementId });
      if (evaluation > 0) {
        // Set evaluation in DB
        setEvaluationToDB(statement, 0);

        // if evaluation is 0 user didn't vote yet so don't do anything
        if (evaluation === 0) return;

        // Set local state
        setProVote((prev) => prev - 1);
      } else {
        setEvaluationToDB(statement, 1);
        setProVote((prev) => prev + 1);
        if (evaluation === 0) return;
        setConVote((prev) => prev - 1);
      }
    } else {
      setUserDataToDB({ userData, documentId: statement.documentSettings?.parentDocumentId, eventType: "like-con", targetText: statement.statement, targetId: statement.statementId });
      if (evaluation < 0) {
        setEvaluationToDB(statement, 0);

        if (evaluation === 0) return;
        setConVote((prev) => prev - 1);
      } else {
        setEvaluationToDB(statement, -1);
        setConVote((prev) => prev + 1);
        if (evaluation === 0) return;
        setProVote((prev) => prev - 1);
      }
    }
  };

  const isSmileActive = evaluation > 0;
  const isFrownActive = evaluation < 0;
  const isUpVote = upDown === "up";
  const isActive = isUpVote ? isSmileActive : isFrownActive;

  return (
    <button
      className={`${styles.thumb} ${isActive ? "" : styles.inactive}`}
      onClick={() => handleVote(isUpVote)}
    >
      {isUpVote ? (
        <div style={{ color: isActive ? "var(--approve)" : "var(--not-selected)" }}>
          <LikeIcon />
        </div>
      ) : (<div style={{ color: isActive ? "var(--reject)" : "var(--not-selected)" }}>
        <DislikeIcon />
      </div>)}
    </button>
  );
};

export default Thumb;
