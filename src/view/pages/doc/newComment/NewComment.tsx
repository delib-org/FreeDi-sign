import { Statement } from "delib-npm";
import {FC} from "react";
import { setCommentToDB } from "../../../../controllers/db/statements/setStatements";

interface Props{
    docStatement:Statement;
    parentId:string;
    order:number;
    
}
const NewComment:FC<Props> = ({docStatement,parentId,order}) => {
  
    function handleAddNewComment(ev:any) {
    try {
        ev.preventDefault();
        const target = ev.target;
        const text = target["new-paragraph"].value;
        if (text) {
            setCommentToDB({
            text,
            parentId,
            docStatement,
            order,
          });
        }

        target.reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleAddNewComment}>
      <textarea name="new-paragraph" id="" placeholder="New Comment" />
      <button>OK</button>
    </form>
  );
};

export default NewComment;
