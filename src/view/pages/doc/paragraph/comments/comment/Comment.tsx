import { AgreeDisagreeEnum, Statement } from "delib-npm";
import { FC, useEffect } from "react";
import styles from "./Comment.module.scss";
import ProfileImage from "../../../../../components/profileImage/ProfileImage";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../../../controllers/slices/userSlice";
import { setAgreesToDB } from "../../../../../../controllers/db/agree/setAgrees";
import { listenToUserAgree } from "../../../../../../controllers/db/agree/getAgree";
import {
  selectAgree,
  updateAgree,
} from "../../../../../../controllers/slices/agreeSlice";
import Button from "../../../../../components/buttons/button/Button";
import { useLanguage } from "../../../../../../controllers/hooks/useLanguage";
import Text from "../../../../../components/text/Text";

interface Props {
  statement: Statement;
}

const Comment: FC<Props> = ({ statement }) => {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const agree = useSelector(selectAgree(statement.statementId));
  const isCreator = user?.uid === statement.creatorId;

  useEffect(() => {
    let unsub = () => {};

    unsub = listenToUserAgree(statement.statementId);

    return () => {
      unsub();
    };
  }, []);

  function handleAgree(_agree: AgreeDisagreeEnum) {
    if (isCreator) return;

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
    <div className={styles.comment}>
      {isAuthor && (
        <div className={styles.profileImage}>
          <ProfileImage user={statement.creator} />
        </div>
      )}
      <div className={styles.description}>
        <Text statement={statement} allowEditing={true}/>
        <div className={styles.btns}>
          {statement.documentAgree?.disagree || 0}
          <Button
            text={t("Disagree")}
            onClick={() => handleAgree(AgreeDisagreeEnum.Disagree)}
            isSelected={
              agree?.agree === AgreeDisagreeEnum.Disagree || isCreator
            }
            backgroundColor="var(--reject)"
            isDisabled={isCreator}
          />
          {/* onClick={() => handleAgree(AgreeDisagreeEnum.Agree)} */}
          <Button
            text={t("Agree")}
            onClick={() => handleAgree(AgreeDisagreeEnum.Agree)}
            isSelected={agree?.agree === AgreeDisagreeEnum.Agree || isCreator}
            backgroundColor="var(--agree)"
            isDisabled={isCreator}
          />
          {statement.documentAgree?.agree || 0}
        </div>
      </div>
    </div>
  );
};

export default Comment;