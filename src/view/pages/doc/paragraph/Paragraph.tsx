import { Approval, Role, Statement, StatementView } from "delib-npm";
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
import { useRole } from "../../../../controllers/hooks/useRole";
import { setViewToDB } from "../../../../controllers/db/views/setViews";
import { getViewsFromDB } from "../../../../controllers/db/views/getViews";

interface Props {
  statement: Statement;
}

const Paragraph: FC<Props> = ({ statement }) => {
  const dispatch = useDispatch();
  const role = useRole();
  const isAdmin = role === Role.admin;

  const paragraphRef = useRef<HTMLDivElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const comments = useSelector(commentsSelector(statement.statementId)).sort(
    (a, b) => b.createdAt - a.createdAt
  );
  const approval: Approval | undefined = useSelector(
    selectApprovalById(statement.statementId)
  );

  const isEdit = useSelector(isEditSelector);
  const [_isEdit, _setIsEdit] = useState(false);
  const [hasBeenViewed, setHasBeenViewed] = useState(true);

  useEffect(() => {
    const fetchView = async () => {
      const view = await getViewsFromDB(statement.statementId);
      if (view && view?.viewed > 0) setHasBeenViewed(true);
      else setHasBeenViewed(false);
    };
    fetchView();
  }, [statement.statementId]);

  useEffect(() => {
    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasBeenViewed) {
            // If paragraph is visible and hasn't been counted yet
            setHasBeenViewed(true);
            console.log(statement.statement, "has been viewed");

            // Here you would typically update your backend/database
            // For example, you might want to create a function like:
            // updateParagraphViews(statement.statementId);

            // You might also want to update your local state/redux store

            // Update your database with the new view count
            // This is a placeholder - implement according to your backend structure
            setViewToDB(statement);
          }
        });
      },
      {
        // Configure the observer:
        threshold: 0.7, // Trigger when 50% of the element is visible
        rootMargin: "0px", // No margin around the viewport
      }
    );

    // Start observing the paragraph
    if (paragraphRef.current) {
      observer.observe(paragraphRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (paragraphRef.current) {
        observer.unobserve(paragraphRef.current);
      }
    };
  }, [hasBeenViewed, statement]);

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
    textarea.value = textarea.value.replace(/\n/g, " ");
    updateParagraphTextToDB({ statement, newText: textarea.value });
  }

  function renderText(text: string) {
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
    const viewed = statement.viewed?.individualViews || 0;

    return (
      <div className={styles.paragraph} ref={paragraphRef}>
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
                {renderText(statement.statement)} {isAdmin && `(${viewed})`}
              </p>
              {isEdit && (
                <button onClick={handleDelete}>
                  <DeleteIcon />
                </button>
              )}
            </div>
          </div>
        )}
        {!isEdit && <Evaluation statement={statement} comments={comments} />}
      </div>
    );
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default Paragraph;
