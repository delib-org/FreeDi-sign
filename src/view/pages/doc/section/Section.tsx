import { FC, useState } from "react";
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

    const [newSection, setNewSection] = useState(false);

    return (
      <section className={styles.section}>
        {!isEdit ? (
          <div className={styles.title}>
            {document.statement.statement}
          </div>
        ) : (
          <input className={styles.input} type="text" defaultValue={document.title} onChange={(e)=>{
            updateSectionTextToDB({statement:document.statement, newText:e.target.value})
          }} 
             />
        )}
        {docStatement && (
          <NewParagraph
            docStatement={docStatement}
            parentId={statementId}
            order={document.sections.length}
          />
        )}
        {document.paragraphs.map((paragraph) => (
          <Paragraph
            key={`p-${paragraph.statementId}`}
            statement={paragraph}
            docStatement={docStatement}
          />
        ))}
        {document.sections.map((section) => (
          <Section
            key={statementId}
            document={section}
            docStatement={docStatement}
            statement={statement}
          />
        ))}
        <button onClick={() => setNewSection(!newSection)}>
          New Sub Section +
        </button>
        {newSection && (
          <section>
            <b>New Section</b>
            <NewSection
              docStatement={docStatement}
              parentId={statementId}
              order={document.sections.length}
            />
          </section>
        )}
      </section>
    );
  } catch (error: any) {
    console.error(error);
    return <div>Error: An error occurred: {error.message}</div>;
  }
};

export default Section;
