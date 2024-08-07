import { Statement } from "delib-npm";
import { DocumentObject } from "../../../../../controllers/general.ts/statement_helpers";
import Section from "../Section";

interface SubSectionProps {
    document: DocumentObject, docStatement:Statement, statement:Statement
  }

function SubSections({document, docStatement, statement}: SubSectionProps) {
    return document.sections.map((section, index) => (
      <Section
        key={index}
        document={section}
        docStatement={docStatement}
        statement={statement} />
    ));
  }

  export default SubSections