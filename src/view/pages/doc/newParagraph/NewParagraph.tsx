import { FC, useRef } from "react";
import { setParagraphToDB } from "../../../../controllers/db/paragraphs/setParagraphs";
import { Statement } from "delib-npm";
import { useSelector } from "react-redux";
import { isEditSelector } from "../../../../controllers/slices/editSlice";
import styles from "./NewParagraph.module.scss";
import { adjustTextAreaHeight } from "../../../../controllers/general.ts/general";

interface Props {
  statement: Statement;
  order: number;
}
const NewParagraph: FC<Props> = ({ statement, order }) => {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const isEditing = useSelector(isEditSelector);

  function handleAddNewParagraph(ev: any) {
    if (ev.key !== "Enter") {
      if (textarea.current) adjustTextAreaHeight(textarea.current);
    } else {
      const text = ev.target.value;

      if (text) {
        setParagraphToDB({
          text,
          statement,
          order,
        });
        ev.target.value = "";
      }
    }
  }

  if (!isEditing) {
    return null;
  }

  return (
    <textarea
      ref={textarea}
      className={styles.newParagraph}
      placeholder="New Paragraph"
      onKeyUp={handleAddNewParagraph}
    />
  );
};

export default NewParagraph;
