import { Statement } from "delib-npm";
import { FC, useState } from "react";

import styles from "./newComment.module.scss";
import { addCommentToDB } from "../../../../../controllers/db/comments/setComments";
import { store } from "../../../../../model/store";
import { useLanguage } from "../../../../../controllers/hooks/useLanguage";
import Button from "../../../../components/buttons/button/Button";
import { useDispatch } from "react-redux";
import { updateShowNewComment } from "../../../../../controllers/slices/commentsSlice";
import { ButtonType } from "../../../../../model/enumsModel";

interface Props {
  parentStatement: Statement;
  order: number;
  show: boolean;
}
const NewComment: FC<Props> = ({ parentStatement, order }) => {
  const [showUserComment, setShowUserComment] = useState(true);
  const { t } = useLanguage();
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        dispatch(updateShowNewComment(false));
      }

      target.reset();
    } catch (error) {
      console.error(error);
    }
  }
  try {
    const user = store.getState().user.user;
    if (!user) throw new Error("User not found");

    return (
      <div className={styles.wrapper}>
        {showUserComment && (
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
              <div
                className={styles.cancel}
                onClick={() => {
                  setShowUserComment(false);
                  dispatch(updateShowNewComment(false));
                }}
              >
                {t("Cancel")}
              </div>
              <Button
                type={"submit"}
              text={t("Add Comment")}
                buttonType={ButtonType.primary}
                isSelected={true}
              />
            </div>
          </form>
        )}
      </div>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default NewComment;
