import { Statement } from "delib-npm";
import { FC, useState } from "react";

import styles from "./newComment.module.scss";
import { addCommentToDB } from "../../../../../../controllers/db/comments/setComments";
import { store } from "../../../../../../model/store";
import { useLanguage } from "../../../../../../controllers/hooks/useLanguage";
import Button, { ButtonType } from "../../../../../components/buttons/button/Button";

interface Props {
  parentStatement: Statement;
  order: number;
  show: boolean;
  setShow: (show: boolean) => void;
}
const NewComment: FC<Props> = ({ parentStatement, order, setShow, show }) => {
  try {
    const [showUserComment, setShowUserComment] = useState(true);
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
                  console.log("click");
                  // setShowUserComment(false);
                  setShowUserComment(false);
                  setShow(false)
                  console.log(show)
                }}
              >
                {t("Cancel")}
              </div>
              <Button type={"submit"} text={t("Add Comment")} buttonType={ButtonType.primary} isSelected={true}/>
              
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
