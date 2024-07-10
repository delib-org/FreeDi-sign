import { Statement } from 'delib-npm'
import {FC} from 'react'
interface Props{
    statement:Statement;
}
const Comment:FC<Props> = ({statement}) => {
  return (
    <div className='comment'>
        comment: {statement.statement}
    </div>
  )
}

export default Comment
