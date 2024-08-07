import { FC, useEffect, useState } from "react";
// import Paragraph from "../paragraph/Paragraph";

import styles from "./Section.module.scss";
import { DocumentObject } from "../../../../controllers/general.ts/statement_helpers";
import NewSection from "../newSection/NewSection";
import NewParagraph from "../newParagraph/NewParagraph";
import Paragraph from "../paragraph/Paragraph";
import { Statement } from "delib-npm";
import { useSelector } from "react-redux";
import {
  isEditSelector,
  setIsEdit,
} from "../../../../controllers/slices/editSlice";
import { updateSectionTextToDB } from "../../../../controllers/db/sections/setSections";
import EditInput from "../../../components/editInput/EditInput";
import { adjustTextAreaHeight } from "../paragraph/paragraphCont";
import NewElement from "../newElement/NewElement";

interface Props {
  docStatement: Statement;
  statement: Statement;
  document: DocumentObject;
}

const Section: FC<Props> = ({ docStatement, document, statement }) => {
  try {
    const isEdit = useSelector(isEditSelector);
    const [_isEdit, _setIsEdit] = useState(false);
    if (!docStatement) throw new Error("Parent statement id is required");
    const { statementId } = document;
    if (!statementId) throw new Error("statementId is required");

    return (
      <section className={styles.sections}>
        {isEdit && _isEdit ? (
          <EditInput
            placeHolder={
              document.title
                ? `${document.level}) ${document.title}`
                : "New Section"
            }
            onChange={(e) => {
              const textarea = e.target as HTMLTextAreaElement;
              adjustTextAreaHeight(textarea);
              updateSectionTextToDB({ document, newText: textarea.value });
            }}
            onBlur={(e) => {
              updateSectionTextToDB({ document, newText: e.target.value });
              _setIsEdit(false);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                const textarea = e.target as HTMLTextAreaElement;
                const value = textarea.value;
                if (value === "") return;

                updateSectionTextToDB({ document, newText: value });
               
                _setIsEdit(false);
              }
            }}
          />
        ) : (
          <div
            onClick={() => {
              if (isEdit) _setIsEdit(true);
            }}
          >
            {sectionHeader(
              `${document.level}) ${document.title}`,
              document.level
            )}
          </div>
        )}

        <div className={styles.sectionWrapper}>
          {document.paragraphs.map((paragraph) => (
            <Paragraph
              key={`p-${paragraph.statementId}`}
              statement={paragraph}
              docStatement={docStatement}
            />
          ))}
          {docStatement && (
            <NewParagraph
              docStatement={docStatement}
              parentId={statementId}
              order={document.sections.length}
            />
          )}
        </div>

        {document.sections.map((section, index) => (
          <Section
            key={index}
            document={section}
            docStatement={docStatement}
            statement={statement}
          />
        ))}
        <NewElement
          docStatement={docStatement}
          order={document.sections.length}
          parentId={statementId}
          level={document.level}
        />
      </section>
    );
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
