import { Statement } from "delib-npm";
import { FC } from "react";

import styles from "./newComment.module.scss";
import StrongMainButton from "../../../../../components/buttons/StrongMainButton";
import MainButton from "../../../../../components/buttons/MainButton";
import { addCommentToDB } from "../../../../../../controllers/db/comments/setComments";
import ProfileImage from "../../../../../components/profileImage/ProfileImage";
import { store } from "../../../../../../model/store";
import { useLanguage } from "../../../../../../controllers/hooks/useLanguage";

interface Props {
  parentStatement: Statement;
  order: number;
  show: boolean;
  setShow: (show: boolean) => void;
}
const NewComment: FC<Props> = ({ parentStatement, order, setShow }) => {
  try {
    const { t } = useLanguage();
    function handleAddNewComment(ev: any) {
      try {
        ev.preventDefault();
        const target = ev.target;
        const text = target["new-comment"].value;
        if (text) {
          const title = text.split("\n")[0];
          const description = text.split("\n").slice(1).join("\n");

          addCommentToDB({
            title,
            description,
            parentStatement,
            order,
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
        <form
          className={styles.wrapper__descriptionWrapper}
          onSubmit={handleAddNewComment}
        >
          <textarea
            placeholder={t("Please provide your thoughts...")}
            className={styles.wrapper__descriptionWrapper__description}
            name="new-comment"
          />
          <div className={styles.wrapper__descriptionWrapper__buttonsWrapper}>
            <StrongMainButton
              value={t("Add Comment")}
              color="white"
              backgroundColor="var(--active-btn)"
              padding="0.23rem 1.41rem"
              width="9.11rem"
              height="1.88rem"
              fontSize="0.94rem"
              type="submit"
            />
            <MainButton
              value={t("Cancel")}
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