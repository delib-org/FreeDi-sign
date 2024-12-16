import { doc, DocumentSnapshot, onSnapshot, Unsubscribe } from "firebase/firestore";
import { store } from "../../../model/store";
import { DB } from "../config";
import { Collections, Evaluation } from "delib-npm";
import { setLike } from "../../slices/evaluationSlice";

export function listenToEvaluation(statementId: string):Unsubscribe{
    try {
        const dispatch = store.dispatch;
        const user = store.getState().user.user;
        if(!user) throw new Error('User is not defined');   
        const userId = user.uid;
        const evaluationId = `${userId}--${statementId}`;

        const evaluationRef = doc(DB, Collections.evaluations, evaluationId);
        return onSnapshot(evaluationRef, (evaluationDB: DocumentSnapshot) => {
            if (evaluationDB.exists()) {
                const evaluation = evaluationDB.data() as Evaluation;
                dispatch(setLike(evaluation));
            }
        });
        
    } catch (error) {
        console.error(error);
        return ()=>{};
    }

}