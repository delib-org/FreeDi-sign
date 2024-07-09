import {FC} from 'react'
import { setParagraphToDB } from '../../../../controllers/db/statements/setStatements';
import { Statement } from 'delib-npm';
interface Props{
    docStatement:Statement;
    parentId:string;
    order:number;
}
const NewParagraph:FC<Props> = ({docStatement, parentId,order}) => {
    function handleAddNewParagraph(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        try {
            const target = e.target as typeof e.target & {
                "new-paragraph": {value: string}
            }
            const text = target["new-paragraph"].value
           
            if(text){
              setParagraphToDB({
                text,
                parentId,
                docStatement,
                order
                })
            }
            (e.target as HTMLFormElement).reset()
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <form onSubmit={handleAddNewParagraph}>
        <textarea name="new-paragraph" id="" placeholder='New Paragraph'/>
        <button>OK</button>
    </form>
  )
}

export default NewParagraph