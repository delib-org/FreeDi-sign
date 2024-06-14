import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { DB } from '../config';
import { Collections, Statement } from "delib-npm";
import { store } from "../../../model/store";
import { setStatements } from "../../slices/statementsSlice";

export async function getStatements(): Promise<Statement[]> {
  try {
    const user = store.getState().user.user;
    if (!user) throw new Error("User not found");

    const statementsRef = collection(DB, Collections.statements);
    const q = query(statementsRef, where("creatorId", "==", "SsXFNEHj2qqOK8CGjXb9M23F2Uoz"));
    const querySnapshot = await getDocs(q);
    const statements: Statement[] = [];
    querySnapshot.forEach((doc: any) => {
      statements.push(doc.data() as Statement);
    });

    return statements;

  } catch (error) {
    console.error("Error getting statements: ", error);
    return [];
  }
}

export function listenToStatements(setIsLoading: Function, setError: Function) {
  try {
    // const user = store.getState().user.user;
    // if (!user) throw new Error("User not found");
    const userId = "SsXFNEHj2qqOK8CGjXb9M23F2Uoz"; // user.userId
    const dispatch = store.dispatch;
    setIsLoading(true);
    const statementsRef = collection(DB, Collections.statements);
    const q = query(statementsRef, where("creatorId", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const statements: Statement[] = [];
      setIsLoading(false);
      querySnapshot.forEach((doc: any) => {
        statements.push(doc.data() as Statement);
      });
      dispatch(setStatements(statements));
    }, (error) => {
      console.error("Error getting statements: ", error);
      setError(error.message);
      setIsLoading(false);
    });

    return unsubscribe;
  } catch (error) {
    console.error("Error getting statements: ", error);
    return () => { };
  }
}