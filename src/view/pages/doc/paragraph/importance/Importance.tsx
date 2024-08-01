import { Statement } from "delib-npm";
import { FC, useState, useEffect } from "react";
import styles from "./importance.module.scss";
import { setImportanceToDB } from "../../../../../controllers/db/importance/setImportance";
import { getImportanceFromDB } from "../../../../../controllers/db/importance/getImportance";

import ImportanceUnchecked from "../../../../../assets/icons/importantUnchecked.svg?react";
import ImportanceIcon0 from "../../../../../assets/icons/important0.svg?react";
import ImportanceIcon1 from "../../../../../assets/icons/important1.svg?react";
import ImportanceIcon2 from "../../../../../assets/icons/important2.svg?react";

interface Props {
  statement: Statement;
  document: Statement;
}

const Importance: FC<Props> = ({ statement, document }) => {
  const [importance, setImportance] = useState<number | undefined>(undefined);
  const [isEdit, setIsEdit] = useState<boolean>(false);

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

  function fromImportanceToIcon(importance: number): JSX.Element {
    if (importance < 0.333333) return <ImportanceIcon0 />;
    if (importance < 0.666666) return <ImportanceIcon1 />;
    return <ImportanceIcon2 />;
  }

  function handleImportance(importance: number) {
    setImportance(importance);
    setImportanceToDB({ document, statement, importance });
  }

  return (
    <>
      {isEdit ? (
        <div className={styles.editMain} onClick={() => setIsEdit(false)}>
          <ImportanceIcon0
            className={styles.imp0}
            onClick={() => handleImportance(0)}
          />
          <ImportanceIcon1
            className={styles.imp1}
            onClick={() => handleImportance(0.5)}
          />
          <ImportanceIcon2
            className={styles.imp2}
            onClick={() => handleImportance(1)}
          />
          {importance === undefined
            ? <div className={styles.unchecked}><ImportanceUnchecked /></div>
            : fromImportanceToIcon(importance)}
        </div>
      ) : (
        <div onClick={() => setIsEdit(true)} className={styles.editMain}>
          {" "}
          {importance === undefined
            ? <div className={styles.unchecked}><ImportanceUnchecked /></div>
            : fromImportanceToIcon(importance)}
        </div>
      )}
    </>
  );
};

export default Importance;
