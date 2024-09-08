import { Statement } from "delib-npm";
import { FC, useState, useEffect } from "react";
import styles from "./importance.module.scss";
import { setImportanceToDB } from "../../../../../../controllers/db/importance/setImportance";
import { getImportanceFromDB } from "../../../../../../controllers/db/importance/getImportance";

import ImportanceIcon0 from "../../../../../../assets/icons/important0.svg?react";
import ImportanceIcon1 from "../../../../../../assets/icons/important1.svg?react";
import ImportanceIcon2 from "../../../../../../assets/icons/important2.svg?react";
import { useLanguage } from "../../../../../../controllers/hooks/useLanguage";

interface Props {
  statement: Statement;
}

const Importance: FC<Props> = ({ statement }) => {
  const [importance, setImportance] = useState<number | undefined>(undefined);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { t } = useLanguage();

  useEffect(() => {
    getImportanceFromDB(statement.statementId).then((importance) => {
      if (importance === undefined) {
        setImportance(undefined);

        return;
      }
      if (typeof importance?.importance === "number")
        setImportance(importance.importance);
      else setImportance(0);
    });
  }, []);

  function handleImportance(importance: number) {
    try {
      setImportance(importance);
      setImportanceToDB({ statement, importance });
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <div className={styles.importance}>
      <div className={styles.importance__items}>
        <ImportanceIcon0
          className={`${styles.importance__item} ${
            importance !== undefined && (importance >=0 && importance < 0.333333)
              ? styles.imp0
              : styles.notSelected
          }`}
          onClick={() => handleImportance(0)}
        />

        <ImportanceIcon1
          className={`${styles.importance__item} ${
            importance !== undefined && (importance>=0.333333 && importance < 0.666666)
              ? styles.imp1
              : styles.notSelected
          }`}
          onClick={() => handleImportance(0.5)}
        />
        <ImportanceIcon2
          className={`${styles.importance__item} ${
            importance !== undefined && (importance>=0.666666 && importance <= 1)
              ? styles.imp2
              : styles.notSelected
          }`}
          onClick={() => handleImportance(1)}
        />
      </div>
      <div className={styles.importance__title}>
        <span>{t("Importance")}</span>
      </div>
    </div>
  );
};

export default Importance;

export function fromImportanceToIcon(importance: number): JSX.Element {
  if (importance < 0.333333) return <ImportanceIcon0 style={{color:"#facf3a"}} />;
  if (importance < 0.666666) return <ImportanceIcon1 style={{color:"#ff976f"}}/>;
  return <ImportanceIcon2 style={{color:"#f16982"}}/>;
}
