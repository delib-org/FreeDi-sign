import { Statement } from "delib-npm";
import { DocumentObject } from "../../../../../controllers/general.ts/statement_helpers";
import Section from "../Section";

interface SubSectionProps {
  document: DocumentObject;
  docStatement: Statement;
  statement: Statement;
  parentOrder: number | string;
}

function SubSections({
  document,
  docStatement,
  statement,
  parentOrder,
}: SubSectionProps) {
  return document.sections.map((section: DocumentObject, index: number) => (
    <Section
      key={index}
      document={section}
      docStatement={docStatement}
      statement={statement}
      order={`${parentOrder}-${index + 1}`}
    />
  ));
}

export default SubSections;
