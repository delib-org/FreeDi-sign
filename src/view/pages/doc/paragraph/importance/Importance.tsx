import { Statement } from "delib-npm";
import { FC, useState } from "react";
import styles from "./importance.module.scss";
import { setImportanceToDB } from "../../../../../controllers/db/importance/setImportance";

interface Props {
  statement: Statement;
  document: Statement;
}

const Importance: FC<Props> = ({ statement, document }) => {
  const [importance, setImportance] = useState<number>(0);
  
  
  
  return (
    <div className={styles.importance}>
      <div className={styles.result}>{fromNumberToValue(importance)}</div>
      <input
        className={styles.range}
        type="range"
        min="0"
        step={0.05}
        max="1"
        defaultValue={importance}
        onChange={(e) => setImportance(e.target.valueAsNumber)}
        onBlur={(e) => setImportanceToDB({ statement, document, importance: e.target.valueAsNumber })}
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