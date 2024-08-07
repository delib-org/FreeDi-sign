import {FC} from 'react'
import { DocumentObject } from '../../../../../controllers/general.ts/statement_helpers';
import { Statement } from 'delib-npm';
import Paragraph from '../../paragraph/Paragraph';

interface Props {
    document: DocumentObject;
    docStatement: Statement;
}

const SubParagraphs:FC<Props> = ({docStatement,document}) => {
  return (
    <>
    {document.paragraphs.map((paragraph) => (
            <Paragraph
              key={`p-${paragraph.statementId}`}
              statement={paragraph}
              docStatement={docStatement}
            />
          ))}
    </>
  )
}

export default SubParagraphs