import { Statement } from "delib-npm";
import { FC } from "react";

import styles from "./newComment.module.scss";
import StrongMainButton from "../../../components/buttons/StrongMainButton";
import MainButton from "../../../components/buttons/MainButton";
import { addCommentToDB } from "../../../../controllers/db/comments/setComments";
import ProfileImage from "../../../components/profileImage/ProfileImage";
import { store } from "../../../../model/store";

interface Props {
  parentStatement: Statement;
  order: number;
  show: boolean;
  setShow: (show: boolean) => void;
}
const NewComment: FC<Props> = ({
  parentStatement,
  order,
  setShow,
}) => {
  try {
    function handleAddNewComment(ev: any) {
      try {
        ev.preventDefault();
        const target = ev.target;
        const text = target["new-comment"].value;
        if (text) {
          addCommentToDB({
            text,
            parentStatement,
            order
          });
          setShow(false);
        }

        target.reset();
      } catch (error) {
        console.error(error);
      }
    }

    const user = store.getState().user.user;
    if (!user) throw new Error("User not found");

    return (
      <div className={styles.wrapper}>
        <div className={styles.wrapper__profileImage}>
          <ProfileImage user={user} />
        </div>
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
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default NewComment;
