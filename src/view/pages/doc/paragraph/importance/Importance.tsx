import { Statement } from "delib-npm";
import { FC, useState, useEffect } from "react";
import styles from "./importance.module.scss";
import { setImportanceToDB } from "../../../../../controllers/db/importance/setImportance";
import { getImportanceFromDB } from "../../../../../controllers/db/importance/getImportance";

interface Props {
  statement: Statement;
  document: Statement;
}

const Importance: FC<Props> = ({ statement, document }) => {
  const [importance, setImportance] = useState<number>(0);

  useEffect(() => {
    getImportanceFromDB(statement.statementId).then((importance) => {
      if (importance) setImportance(importance.importance);
      else setImportance(0);
    });
  }, []);

  return (
    <div className={styles.importance}>
      <div className={styles.result}>{fromNumberToValue(importance)}</div>
      <input
        className={styles.range}
        type="range"
        min="0"
        step={0.01}
        max="1"
        value={importance}
        onChange={(e) => setImportance(e.target.valueAsNumber)}
        onMouseLeave={(e:any) => {
          
          setImportanceToDB({
            statement,
            document,
            importance: e.target.valueAsNumber,
          });
        }}
        onTouchEnd={(e:any) => {
          
          setImportanceToDB({
            statement,
            document,
            importance: e.target.valueAsNumber,
          });
        }}
      />
    </div>
  );
};

export default Importance;

function fromNumberToValue(number: number): string {
  if (number < 0.2) return "unimportant";
  if (number < 0.4) return "somewhat important";
  if (number < 0.6) return "important";
  if (number < 0.8) return "highly important";
  return "super important";
}
