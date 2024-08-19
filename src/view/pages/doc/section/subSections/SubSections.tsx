import { Statement } from "delib-npm";
import Section from "../Section";
import { useSelector } from "react-redux";
import { sectionsSelector } from "../../../../../controllers/slices/statementsSlice";
import { useEffect } from "react";

interface SubSectionProps {
  statement: Statement;
  parentBullet: string;
  parentLevel: number;
  setSubSectionsLength: (length: number) => void;
}

function SubSections({ statement,parentBullet, parentLevel,setSubSectionsLength}: SubSectionProps) {
  try {
    const { statementId } = statement;
    const sections:Statement[] = useSelector(sectionsSelector(statementId));
    
    useEffect(() => {
      if (sections) setSubSectionsLength(sections.length);
    }, [sections]);

    return sections.map((section: Statement, index: number) => (
      <Section key={index} statement={section} order={index + 1} parentLevel={parentLevel} parentBullet={parentBullet}/>
    ));
  } catch (error) {
    console.error("Error setting statement: ", error);
    return null;
  }
}

export default SubSections;
