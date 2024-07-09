import { FC, useState } from "react";
// import Paragraph from "../paragraph/Paragraph";

import styles from "./Section.module.scss";
import { DocumentObject } from "../../../../controllers/general.ts/statement_helpers";
import NewSection from "../newSection/NewSection";
import NewParagraph from "../newParagraph/NewParagraph";
import Paragraph from "../paragraph/Paragraph";
import { Statement } from "delib-npm";

interface Props {
  docStatement: Statement;
  statement: Statement;
  document: DocumentObject;
}

const Section: FC<Props> = ({ docStatement, document, statement }) => {
  try {
    if (!docStatement) throw new Error("Parent statement id is required");
    const { sectionId } = document;
    if (!sectionId) throw new Error("Section id is required");

    const [newSection, setNewSection] = useState(false);

    return (
      <section className={styles.section}>
        <h2>
          {document.title} {sectionId}
        </h2>
        {docStatement && <NewParagraph
          docStatement={docStatement}
          parentId={statement.statementId}
          order={document.sections.length}
        />}
        {document.paragraphs.map((paragraph) => (
          <Paragraph key={paragraph.statementId} statement={paragraph} />
        ))}
        {document.sections.map((section) => (
          <Section
            key={section.sectionId}
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
              parentId={statement.statementId}
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
