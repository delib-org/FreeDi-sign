import {FC} from 'react'
import { setParagraphToDB } from '../../../../controllers/db/statements/setStatements';
interface Props{
    parentDocumentId:string;
    parentId:string;
    order:number;
}
const NewParagraph:FC<Props> = ({parentId,parentDocumentId,order}) => {
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
                parentDocumentId,
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