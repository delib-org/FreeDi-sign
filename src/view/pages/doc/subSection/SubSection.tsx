import { FC } from "react";
import styles from "./subSection.module.scss";
import { DocumentObject } from "../../../../controllers/general.ts/statement_helpers";
import NewSection from "../newSection/NewSection";
import NewParagraph from "../newParagraph/NewParagraph";
import Paragraph from "../paragraph/Paragraph";
import { Statement } from "delib-npm";
import EditInput from "../../../components/editInput/EditInput";
import { useSelector } from "react-redux";
import { isEditSelector } from "../../../../controllers/slices/editSlice";

interface Props {
  docStatement: Statement;
  statement: Statement;
  document: DocumentObject;
}

const NewSubSection: FC<Props> = ({ docStatement, document, statement }) => {
  try {
    const isEdit = useSelector(isEditSelector);
    if (!docStatement) throw new Error("Parent statement id is required");
    const { statementId } = document;
    if (!statementId) throw new Error("statementId is required");

    //Need to remove this file after we fixing the diffrence between sections and sub sections.

    return (
      <section className={styles.subSections}>
        <div className={styles.subSections__subSectionWrapper}>
          {isEdit ? <EditInput placeHolder={document.title}/> :<h2 className={styles.subSections__subSectionWrapper__subSectionTitle}>{document.title}</h2>}
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
          <NewSubSection
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

export default NewSubSection;
