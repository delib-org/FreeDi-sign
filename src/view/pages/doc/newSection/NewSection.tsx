import { FC, useState } from "react";
import { setSectionToDB } from "../../../../controllers/db/statements/setStatements";
import { Statement } from "delib-npm";
import StrongMainButton from "../../../components/buttons/StrongMainButton";
import styles from "./NewSection.module.scss";
import { useSelector } from "react-redux";
import { isEditSelector } from "../../../../controllers/slices/editSlice";

interface Props {
  docStatement: Statement;
  order: number;
  parentId: string;
  buttonValue?: string;
  isTop?: boolean;
}

const NewSection: FC<Props> = ({
  docStatement,
  order,
  parentId,
  buttonValue = "Add new sub section",
  isTop = false,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const isEditing  = useSelector(isEditSelector);

  function handleSubmitText(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!docStatement) throw new Error("parentStatementId is required");

    try {
      const target = e.target as typeof e.target & {
        "new-statement": { value: string };
      };
      const text = target["new-statement"].value;

      if (text)
        setSectionToDB({
          text,
          docStatement,
          parentId,
          order,
          isTop,
        });
      setInputValue("");
      (e.target as HTMLFormElement).reset()
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

  if(!isEditing) return null;

  //edit mode + input value state. need to remove it and adjust the button to make instantly new section
  return (
    <>
      {editMode === false ? (
        <StrongMainButton
          padding="8px 52px"
          backgroundColor="var(--active-btn)"
          color="#fff"
          value={buttonValue}
          width="14.05rem"
          height="2.41rem"
          fontSize="1rem"
          onClick={changeEditMode}
        />
      ) : (
        <form onSubmit={handleSubmitText} className={styles.form}>
          <input
            type="text"
            name="new-statement"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={styles.form__text}
            placeholder="Section Title"
          />
          <div className={styles.form__buttonWrapper}>
            <input type="submit" value="Ok" className={styles.form__buttonWrapper__submit} />
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

export default NewSection;
