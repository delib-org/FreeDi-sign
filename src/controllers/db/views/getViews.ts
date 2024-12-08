import { Collections, StatementView, StatementViewSchema } from "delib-npm";
import { store } from "../../../model/store";
import { DB } from "../config";
import { doc, getDoc } from "firebase/firestore";

export async function getViewsFromDB(statementId: string) {
  try {
    const userId = store.getState().user.user?.uid;
    if(!userId) throw new Error("User not found");

    const viewRef =  doc(DB, Collections.statementViews, `${userId}--${statementId}`);
    const viewDB = await getDoc(viewRef);
    if(!viewDB.exists()) return undefined;

    const view = viewDB.data() as StatementView;
    const results = StatementViewSchema.safeParse(view);
    if(!results.success) {
        console.error(results.error);
        console.info(view);
        throw new Error("View is not valid");
    }
    return view;

  } catch (error) {
    console.error(error);
    return undefined;
  }
}