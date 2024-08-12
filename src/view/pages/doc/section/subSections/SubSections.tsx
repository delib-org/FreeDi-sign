import { Statement } from "delib-npm";
import Section from "../Section";
import { useSelector } from "react-redux";
import { sectionsSelector } from "../../../../../controllers/slices/statementsSlice";

interface SubSectionProps {
  statement: Statement;
  parentBullet: string;
  parentLevel: number;
}

function SubSections({ statement,parentBullet, parentLevel}: SubSectionProps) {
  try {
    const { statementId } = statement;
    const sections = useSelector(sectionsSelector(statementId));

    return sections.map((section: Statement, index: number) => (
      <Section key={index} statement={section} order={index + 1} parentLevel={parentLevel} parentBullet={parentBullet}/>
    ));
  } catch (error) {
    console.error("Error setting statement: ", error);
    return null;
  }
}

export default SubSections;
