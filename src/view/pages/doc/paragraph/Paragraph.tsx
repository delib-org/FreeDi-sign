import { Approval, Statement } from "delib-npm";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  commentsSelector,
  deleteStatement,
} from "../../../../controllers/slices/statementsSlice";
import styles from "./Paragraph.module.scss";
import { isEditSelector } from "../../../../controllers/slices/editSlice";
import { updateParagraphTextToDB } from "../../../../controllers/db/paragraphs/setParagraphs";
import Evaluation from "./evaluation/Evaluation";
import { adjustTextAreaHeight } from "../../../../controllers/general.ts/general";
import { deleteParagraphFromDB } from "../../../../controllers/db/paragraphs/setParagraphs";
import DeleteIcon from "../../../../assets/icons/trash.svg?react";
import { selectApprovalById } from "../../../../controllers/slices/approvalSlice";


interface Props {
  statement: Statement;
}
const Paragraph: FC<Props> = ({ statement }) => {
  const dispatch = useDispatch();

  const textarea = useRef<HTMLTextAreaElement>(null);
  const comments = useSelector(commentsSelector(statement.statementId)).sort(
    (a, b) => b.createdAt - a.createdAt
  );
  const approval: Approval | undefined = useSelector(
    selectApprovalById(statement.statementId)
  );

  const isEdit = useSelector(isEditSelector);
  const [_isEdit, _setIsEdit] = useState(false);

  useEffect(() => {
    //get the previous value of isEdit
  }, [isEdit]);

  useEffect(() => {
    if (isEdit && textarea.current) {
      adjustTextAreaHeight(textarea.current);
    }
  }, [isEdit, textarea, _isEdit]);



  function handleDelete() {
    const shouldDelete = confirm(
      "Are you sure you want to delete this paragraph?"
    );
    if (!shouldDelete) return;
    deleteParagraphFromDB(statement);
    dispatch(deleteStatement(statement.statementId));
  }

  function handleUpdate(
    e:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.FocusEvent<HTMLTextAreaElement>
  ) {
    if (e.type === "keyup" && (e as React.KeyboardEvent).key !== "Enter")
      return;
    _setIsEdit(false);
    const textarea = e.target as HTMLTextAreaElement;
    if (textarea.value === "") {
      textarea.value = statement.statement;
    }
    //remove new lines
    textarea.value = textarea.value.replace(/\n/g, " ");
    updateParagraphTextToDB({ statement, newText: textarea.value });
  }

  function renderText(text: string) {
    //if * is found, render the text as bold
    if (text.includes("*")) {
      const parts = text.split("*");
      return parts.map((part, index) => {
        if (index % 2 === 0) {
          return <span key={index}>{part}</span>;
        } else {
          return <b key={index}>{part}</b>;
        }
      });
    } else {
      return text;
    }
  }

  try {
    return (
      <div className={styles.paragraph}>
        {isEdit && _isEdit ? (
          <textarea
            ref={textarea}
            placeholder="Enter Text ... "
            autoFocus={true}
            defaultValue={statement.statement}
            className={`${styles.textArea} ${styles.textAreaEdit}`}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              adjustTextAreaHeight(e.target);
              updateParagraphTextToDB({ statement, newText: e.target.value });
            }}
            onBlur={handleUpdate}
            onKeyUp={handleUpdate}
          />
        ) : (
          <div className={styles.paragraphLine}>
            <div className={styles.paragraphText}>
              <p
                className={`${styles.textArea} ${styles.textAreaP} ${
                  approval?.approval === false && styles.rejected
                }`}
                onClick={() => {
                  _setIsEdit(true);
                }}
              >
                {renderText(statement.statement)}
              </p>
              {isEdit && (
                <button onClick={handleDelete}>
                  <DeleteIcon />
                </button>
              )}
            </div>
          </div>
        )}
        {!isEdit && (
          <Evaluation
            statement={statement}
            comments={comments}
          />
        )}
      </div>
    );
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default Paragraph;
