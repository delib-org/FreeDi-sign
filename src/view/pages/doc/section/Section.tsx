import { FC } from "react";
// import Paragraph from "../paragraph/Paragraph";

import styles from "./Section.module.scss";
import { DocumentObject } from "../../../../controllers/general.ts/statement_helpers";
import NewSection from "../newSection/NewSection";
import NewParagraph from "../newParagraph/NewParagraph";
import Paragraph from "../paragraph/Paragraph";
import { Statement } from "delib-npm";
import { useSelector } from "react-redux";
import { isEditSelector } from "../../../../controllers/slices/editSlice";
import { updateSectionTextToDB } from "../../../../controllers/db/sections/setSections";
import EditInput from "../../../components/editInput/EditInput";
import { adjustTextAreaHeight } from "../paragraph/paragraphCont";

interface Props {
  docStatement: Statement;
  statement: Statement;
  document: DocumentObject;
}

const Section: FC<Props> = ({ docStatement, document, statement }) => {
  try {
    const isEdit = useSelector(isEditSelector);
    if (!docStatement) throw new Error("Parent statement id is required");
    const { statementId } = document;
    if (!statementId) throw new Error("statementId is required");

    return (
      <section className={styles.sections}>
        {isEdit ? (
          <EditInput
            placeHolder={document.title ? document.title : "Write Section"}
            onChange={(e) => {
              adjustTextAreaHeight(e.target);
              updateSectionTextToDB({ statement, newText: e.target.value });
            }}
            onBlur={(e) =>
              updateSectionTextToDB({ statement, newText: e.target.value })
            }
          />
        ) : (
          <h2 className={styles.sectionTitle}>{document.title != "" ? document.title : "Write Section"}</h2>
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
        <NewSection
          docStatement={docStatement}
          parentId={statementId}
          order={document.sections.length}
          buttonValue="Add Sub Section"
        />
      </section>
    );
  } catch (error: any) {
    console.error(error);
    return <div>Error: An error occurred: {error.message}</div>;
  }
};

export default Section;
