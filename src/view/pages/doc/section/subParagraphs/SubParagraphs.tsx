import {FC} from 'react'
import { Statement } from 'delib-npm';
import Paragraph from '../../paragraph/Paragraph';
import { useSelector } from 'react-redux';
import { paragraphsSelector } from '../../../../../controllers/slices/statementsSlice';

interface Props {
    parentStatement: Statement;
}

const SubParagraphs:FC<Props> = ({parentStatement}) => {
  const { statementId } = parentStatement;
 
  const paragraphs = useSelector(paragraphsSelector(statementId));

  return (
    <>
    {paragraphs.map((paragraph) => (
            <Paragraph
              key={`p-${paragraph.statementId}`}
              statement={paragraph}
            />
          ))}
    </>
  )
}

export default SubParagraphs