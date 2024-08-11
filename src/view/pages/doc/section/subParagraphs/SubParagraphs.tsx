import {FC} from 'react'
import { DocumentObject } from '../../../../../controllers/general.ts/statement_helpers';
import { Statement } from 'delib-npm';
import Paragraph from '../../paragraph/Paragraph';

interface Props {
    document: DocumentObject;
    statement: Statement;
}

const SubParagraphs:FC<Props> = ({statement,document}) => {
  return (
    <>
    {document.paragraphs.map((paragraph) => (
            <Paragraph
              key={`p-${paragraph.statementId}`}
              statement={paragraph}
              statement={statement}
            />
          ))}
    </>
  )
}

export default SubParagraphs