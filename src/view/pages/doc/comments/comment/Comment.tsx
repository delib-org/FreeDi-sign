import { Statement } from "delib-npm";
import { FC, useEffect } from "react";
import styles from "./Comment.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../../controllers/slices/userSlice";
import { setAgreesToDB } from "../../../../../controllers/db/agree/setAgrees";
import { listenToUserAgree } from "../../../../../controllers/db/agree/getAgree";
import {
  selectAgree,
  updateAgree,
} from "../../../../../controllers/slices/agreeSlice";
import Button from "../../../../components/buttons/button/Button";
import { useLanguage } from "../../../../../controllers/hooks/useLanguage";
import Text from "../../../../components/text/Text";
import { ButtonType } from "../../../../../model/enumsModel";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAgree(_agree: number) {
    if (isCreator) return;

    let __agree = 0;
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
      <div
        className={styles.description}
        style={{
          borderLeft: isAuthor
            ? "4px solid var(--icon-blue)"
            : "1px solid var(--icon-blue)",
        }}
      >
        <div className={styles.text}>
          <Text statement={statement} allowEditing={true} />
        </div>
        <div className={styles.btns}>
          {statement.documentAgree?.disagree || 0}
          {isAuthor ? (
            <div className={styles.disagree}>{t("Disagreed")}</div>
          ) : (
            <Button
              type="button"
              text={t("Disagree")}
              onClick={() => handleAgree(-1)}
              isSelected={(agree && agree?.agree < 0) || isCreator}
              buttonType={ButtonType.reject}
              isDisabled={isCreator}
            />
          )}
          {/* onClick={() => handleAgree(AgreeDisagreeEnum.Agree)} */}
          {isAuthor ? (
            <div className={styles.agree}>{t("Agreed")}</div>
          ) : (
            <Button
              type="button"
              text={t("Agree")}
              onClick={() => handleAgree(1)}
              isSelected={(agree && agree?.agree > 0) || isCreator}
             buttonType={ButtonType.approve}
              isDisabled={isCreator}
            />
          )}
          {statement.documentAgree?.agree || 0}
        </div>
      </div>
    </div>
  );
};

export default Comment;
