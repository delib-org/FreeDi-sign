import { Statement } from "delib-npm";
import { FC } from "react";

import styles from "./newComment.module.scss";
import StrongMainButton from "../../../components/buttons/StrongMainButton";
import MainButton from "../../../components/buttons/MainButton";
import { addCommentToDB } from "../../../../controllers/db/comments/setComments";

interface Props {
  docStatement: Statement;
  paragraphStatement: Statement;
  parentStatement: Statement;
  order: number;
}
const NewComment: FC<Props> = ({ docStatement, paragraphStatement,parentStatement, order }) => {
  function handleAddNewComment(ev: any) {
    try {
      ev.preventDefault();
      const target = ev.target;
      const text = target["new-comment"].value;
      if (text) {
        addCommentToDB({
          text,
          paragraphStatement,
          parentStatement,
          docStatement,
          order,
        });
      }

      target.reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.wrapper}>
      <img alt="Img" className={styles.wrapper__profileImage} />
      <form
        className={styles.wrapper__descriptionWrapper}
        onSubmit={handleAddNewComment}
      >
        <textarea
          placeholder="Please, provide your thoughts in this space..."
          className={styles.wrapper__descriptionWrapper__description}
          name="new-comment"
        />
        <div className={styles.wrapper__descriptionWrapper__buttonsWrapper}>
          <StrongMainButton
            value="Save comment"
            color="white"
            backgroundColor="var(--active-btn)"
            padding="0.23rem 1.41rem"
            width="9.11rem"
            height="1.88rem"
            fontSize="0.94rem"
            type="submit"
          />
          <MainButton
            value="Cancel"
            color="var(--icon-blue)"
            backgroundColor="var(--inactive-btn)"
            padding="0.23rem 1.41rem"
            height="1.88rem"
            fontSize="0.94rem"
          />
        </div>
      </form>
    </div>
  );
};

export default NewComment;
