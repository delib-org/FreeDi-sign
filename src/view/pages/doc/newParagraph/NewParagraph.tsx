import { FC, useState } from "react";
import { setParagraphToDB } from "../../../../controllers/db/statements/setStatements";
import { Statement } from "delib-npm";
import StrongMainButton from "../../../components/buttons/StrongMainButton";
import styles from "./newParagraph.module.scss";
interface Props {
  docStatement: Statement;
  parentId: string;
  order: number;
}
const NewParagraph: FC<Props> = ({ docStatement, parentId, order }) => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  function handleAddNewParagraph(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const target = e.target as typeof e.target & {
        "new-paragraph": { value: string };
      };
      const text = target["new-paragraph"].value;

      if (text) {
        setParagraphToDB({
          text,
          parentId,
          docStatement,
          order,
        });
      }
      setEditMode(!editMode);
      setInputValue("");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
    }
  }
  function changeEditMode() {
    setEditMode(!editMode);
  }

  const handleCancel = () => {
    setEditMode(false);
    setInputValue("");
  };

  //edit mode + input value state. need to remove it and adjust the button to make instantly new paragraph
  return (
    <>
      {editMode === false ? (
        <StrongMainButton
          backgroundColor="var(--cinnamon)"
          color="#fff"
          value="Add paragraph"
          onClick={changeEditMode}
        />
      ) : (
        <form onSubmit={handleAddNewParagraph} className={styles.form}>
          <input
            type="text"
            name="new-paragraph"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={styles.form__text}
            placeholder="Section Paragraph"
          />
          <div className={styles.form__buttonWrapper}>
            <input
              type="submit"
              value="Ok"
              className={styles.form__buttonWrapper__submit}
            />
            <input
              type="button"
              value="Cancel"
              onClick={handleCancel}
              className={styles.form__buttonWrapper__cancel}
            />
          </div>
        </form>
      )}
    </>
  );
};

export default NewParagraph;
