import { Statement } from "delib-npm";
import { FC } from "react";
import Paragraph from "../paragraph/Paragraph";
import NewStatement from "../newStatement/NewStatement";
interface Props {
  parentStatementId: string | undefined;
  statements: Statement[];
}
import styles from './Section.module.scss'

const Section: FC<Props> = ({ statements, parentStatementId }) => {
  try {
    if (!parentStatementId) throw new Error("Parent statement id is required");
    const sectionId = statements[0].documentSettings?.sectionId;
    if (!sectionId) throw new Error("Section id is required");
    
    const _statements = statements.filter((statement) => statement.documentSettings?.parentSectionId === sectionId);

    return (
      <section className={styles.section}>
        {_statements.map((statement: Statement) => (
          <Paragraph key={statement.statementId} statement={statement} />
        ))}
       <NewStatement parentStatementId={parentStatementId} statements={statements} sectionId={sectionId} parentSectionId={sectionId}/>
      </section>
    );
  } catch (error:any) {
    console.error(error);
    return <div>Error: An error occurred: {error.message}</div>;
  }
};

export default Section;
