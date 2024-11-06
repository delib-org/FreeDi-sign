import { FC, useState } from "react";
import styles from "./Text.module.scss";
import { Statement } from "delib-npm";
import { useSelector } from "react-redux";
import { selectUser } from "../../../controllers/slices/userSlice";
import { updateStatementText } from "../../../controllers/db/statements/setStatements";

interface Props {
  statement?: Statement;
  allowEditing?: boolean;
}
const Text: FC<Props> = ({ statement, allowEditing }) => {
  
    const userId = useSelector(selectUser)?.uid;
    const isCreator = userId === statement?.creatorId;
    const [edit, setEdit] = useState(false);
    const { statement: title, description } = statement || {};
    
    if (title === undefined || description === undefined) return null;

    const textId = `${Math.random()}`.replace(".", "");

    function handleEdit() {
      if (!allowEditing || !isCreator) return;
      setEdit(true);
    }

    function handleSave(e: React.KeyboardEvent<HTMLTextAreaElement>) {
      if (e.key === "Enter" && !e.shiftKey) {
        const title = e.currentTarget.value.split("\n")[0];
        const description = e.currentTarget.value
          .split("\n")
          .slice(1)
          .join("\n");

        if (statement) updateStatementText({ statement, title, description });
        setEdit(false);
      }
    }

    if (allowEditing && edit) {
      return (
        <textarea
          className={`${styles.text} && ${styles.textarea}`}
          defaultValue={`${title}\n${description || ""}`}
          placeholder="Write your text here"
          autoFocus={true}
          onKeyDown={handleSave}
        ></textarea>
      );
    }
    try {

    //convert sentences, divided by /n to paragraphs
    const paragraphs = !description
      ? ""
      : description
          .split("\n")
          .filter((p) => p)
          .map((paragraph: string, i: number) => {
            //if paragraph has * at some point and has some * at some other point make the string between the * bold
            if (paragraph.includes("*")) {
              const boldedParagraph = paragraph.split("*").map((p, i) => {
                if (i % 2 === 1) return <b key={`${textId}--${i}`}>{p}</b>;

                return p;
              });

              return (
                <p
                  className={`${styles["p--bold"]} ${styles.p}`}
                  key={`${textId}--${i}`}
                >
                  {boldedParagraph}
                </p>
              );
            }

            return (
              <p className={styles.p} key={`${textId}--${i}`}>
                {paragraph}
              </p>
            );
          });

    return (
      <div onClick={handleEdit}>
        {title && <p className={styles.title}>{title}</p>}
        {paragraphs.length > 0 && (
          <div className={styles.text}>{paragraphs}</div>
        )}
      </div>
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);

    return <p>error: {error.message}</p>;
  }
};

export default Text;
