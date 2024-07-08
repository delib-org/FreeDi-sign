import {FC} from 'react'
import { setParagraphToDB } from '../../../../controllers/db/statements/setStatements';
interface Props{
    parentStatementId:string;
    sectionId:string;
    order:number;
}
const NewParagraph:FC<Props> = ({parentStatementId,sectionId,order}) => {
    function handleAddNewParagraph(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        try {
            const target = e.target as typeof e.target & {
                "new-paragraph": {value: string}
            }
            const newParagraph = target["new-paragraph"].value
            console.log("newParagraph", newParagraph)
            if(newParagraph){
              setParagraphToDB({
                statement: newParagraph,
                statementId: parentStatementId,
                order,
                sectionId
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