import { FC, useState } from "react";
import styles from "./Section.module.scss";
import { DocumentObject } from "../../../../controllers/general.ts/statement_helpers";
import NewParagraph from "../newParagraph/NewParagraph";
import { Statement } from "delib-npm";
import { useSelector } from "react-redux";
import { isEditSelector } from "../../../../controllers/slices/editSlice";
import { updateSectionTextToDB } from "../../../../controllers/db/sections/setSections";
import EditInput from "../../../components/editInput/EditInput";
import NewElement from "../newElement/NewElement";
import SubParagraphs from "./subParagraphs/SubParagraphs";
import SubSections from "./subSections/SubSections";
import { adjustTextAreaHeight } from "../../../../controllers/general.ts/general";

interface Props {
  docStatement: Statement;
  statement: Statement;
  document: DocumentObject;
  order: number | string;
}

const Section: FC<Props> = ({ docStatement, document, statement, order }) => {
  try {
    const isEdit = useSelector(isEditSelector);
    const [_isEdit, _setIsEdit] = useState(false);
    if (!docStatement) throw new Error("Parent statement id is required");
    const { statementId } = document;
    if (!statementId) throw new Error("statementId is required");

    return (
      <section className={`${styles.section} ${isEdit ? styles.edit : null}`}>
        {isEdit && _isEdit ? (
          <EditInput
            placeHolder={document.title ? document.title : "add title"}
            onChange={handleChange}
            onBlur={handleUpdate}
            onKeyUp={handleUpdate}
          />
        ) : (
          <div
            onClick={() => {
              if (isEdit) _setIsEdit(true);
            }}
          >
            {sectionHeader(`${order}) ${document.title}`, document.level)}
          </div>
        )}

        <div className={styles.sectionsWrapper}>
          <div className={styles.paragraphs}>
            <SubParagraphs docStatement={docStatement} document={document} />
            {docStatement && (
              <NewParagraph
                docStatement={docStatement}
                parentId={statementId}
                order={document.sections.length}
              />
            )}
          </div>
          <div className={styles.sections}>
            <SubSections
              document={document}
              docStatement={docStatement}
              statement={statement}
              parentOrder={order}
            />
          </div>
          <NewElement
            docStatement={docStatement}
            orderText={order}
            order={document.sections.length}
            parentId={statementId}
            level={document.level}
          />
        </div>
      </section>
    );

    function handleChange(e: any) {
      const textarea = e.target as HTMLTextAreaElement;
      adjustTextAreaHeight(textarea);
      updateSectionTextToDB({ document, newText: textarea.value });
    }

    function handleUpdate(e: any) {
      if (e.key === "Enter" || e.type === "blur") {
        const textarea = e.target as HTMLTextAreaElement;
        const value = textarea.value;
        if (value === "") return;

        updateSectionTextToDB({ document, newText: value });

        _setIsEdit(false);
      }
    }
  } catch (error: any) {
    console.error(error);
    return <div>Error: An error occurred: {error.message}</div>;
  }
};

export default Section;

export function sectionHeader(title: string, level: number) {
  switch (level) {
    case 2:
      return <h2>{title}</h2>;
    case 3:
      return <h3>{title}</h3>;
    case 4:
      return <h4>{title}</h4>;
    case 5:
      return <h5>{title}</h5>;
    case 6:
      return <h6>{title}</h6>;
    default:
      return <h6>{title}</h6>;
  }
}
