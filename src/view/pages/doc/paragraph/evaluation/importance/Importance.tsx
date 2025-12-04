import { Statement } from "delib-npm";
import { FC, useState, useEffect } from "react";
import styles from "./importance.module.scss";
import { setImportanceToDB } from "../../../../../../controllers/db/importance/setImportance";
import { getImportanceFromDB } from "../../../../../../controllers/db/importance/getImportance";

import ImportanceIcon0 from "../../../../../../assets/icons/important0.svg?react";
import ImportanceIcon1 from "../../../../../../assets/icons/important1.svg?react";
import ImportanceIcon2 from "../../../../../../assets/icons/important2.svg?react";
import ThumbUpIcon from '../../../../../../assets/icons/simpleLike/thumbUpFull.svg?react';
import { useLanguage } from "../../../../../../controllers/hooks/useLanguage";

interface Props {
  statement: Statement;
}

const Importance: FC<Props> = ({ statement }) => {
  const [importance, setImportance] = useState<number | undefined>(undefined);


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
  }, [statement.statementId]);

  function handleImportance(importance: number) {
    try {
      setImportance(importance);
      setImportanceToDB({ statement, importance });
    } catch (error) {
      console.error(error);
    }
  }

  const importanceArray = new Array(5).fill(0);




  return (
    <div className={styles.importance}>
      <div className={styles.importance__items}>
        {importanceArray.map((_, index) =>
        (<ThumbUpIcon
          className={`${styles.importance__item} ${importance !== undefined && (importance > (index / importanceArray.length))
            ? styles.selected
            : styles.notSelected
            }`}
          onClick={() => handleImportance((index+1) / importanceArray.length)}
          key={index} />))
        }
      </div>
      <div className={styles.importance__title}>
        <span>{t("Importance")}</span>
      </div>
    </div>
  );
};

export default Importance;

export function fromImportanceToIcon(importance: number): JSX.Element {
  if (importance < 0.333333) return <ImportanceIcon0 style={{ color: "#facf3a" }} />;
  if (importance < 0.666666) return <ImportanceIcon1 style={{ color: "#ff976f" }} />;
  return <ImportanceIcon2 style={{ color: "#f16982" }} />;
}
