import { Statement } from 'delib-npm';
import {FC} from 'react'


interface Props {
    statement: Statement;
}
const Paragraph:FC<Props> = ({statement}) => {
  return (
    <p>{statement.statement} {statement.statementId}</p>
  )
}

export default Paragraph