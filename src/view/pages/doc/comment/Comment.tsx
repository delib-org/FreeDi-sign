import { Statement } from "delib-npm";
import { FC } from "react";
import styles from "./Comment.module.scss";

interface Props {
  statement: Statement;
}
const Comment: FC<Props> = ({ statement }) => {
  return (
    <div className={styles.comment}>
      <div className={styles.comment__approval}>
        <button>Approve</button>
        <button>Reject</button>
      </div>
      <p>comment: {statement.statement}</p>
    </div>
  );
};

export default Comment;
