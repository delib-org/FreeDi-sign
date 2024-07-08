
import { FC } from "react";
// import Paragraph from "../paragraph/Paragraph";
import NewStatement from "../newStatement/NewStatement";

import styles from './Section.module.scss'
import { DocumentObject } from "../../../../controllers/general.ts/statement_helpers";

interface Props {
  parentStatementId: string | undefined;
  document: DocumentObject;
}

const Section: FC<Props> = ({ parentStatementId, document }) => {
  try {
    if (!parentStatementId) throw new Error("Parent statement id is required");
    const {sectionId} = document
    if (!sectionId) throw new Error("Section id is required");
    

    return (
      <section className={styles.section}>
        <h2>{document.title} {sectionId}</h2>
        
       <NewStatement parentStatementId={parentStatementId}  sectionId={sectionId} parentSectionId={sectionId} order={0}/>
      </section>
    );
  } catch (error:any) {
    console.error(error);
    return <div>Error: An error occurred: {error.message}</div>;
  }
};

export default Section;
