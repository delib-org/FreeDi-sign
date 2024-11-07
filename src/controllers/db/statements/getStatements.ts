import { Unsubscribe, collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { DB } from '../config';
import { Collections, Statement, StatementSubscription } from "delib-npm";
import { store } from "../../../model/store";
import { deleteStatement, setStatement, setStatements } from "../../slices/statementsSlice";
import { UnsubscribeObject } from "../../../model/unsubscribeModel";

export async function getStatements(): Promise<Statement[]> {
  try {
    const user = store.getState().user.user;
    if (!user) throw new Error("User not found");

    const statementsRef = collection(DB, Collections.statements);
    const q = query(statementsRef, where("creatorId", "==", user.uid));
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
    const user = store.getState().user.user;
    if (!user) throw new Error("User not found");
    const userId = user.uid;

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



export function listenToUserTopStatements(unsubscribes: UnsubscribeObject[], setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<any>, numberOfStatements = 30): () => void {
  try {
    const dispatch = store.dispatch;
    const user = store.getState().user.user;
    if (!user) throw new Error("User not logged in");
    if (!user.uid) throw new Error("User not logged in");

    const statementsSubscribeRef = collection(DB, Collections.statementsSubscribe);
    const q = query(statementsSubscribeRef, where("userId", "==", user.uid), where('statement.parentId', "==", "top"), orderBy("lastUpdate", "desc"), limit(numberOfStatements));



    return onSnapshot(q, (subscriptionsDB) => {
      subscriptionsDB.docChanges().forEach((change) => {
        const statementSubscription = change.doc.data() as StatementSubscription;
        setIsLoading(false);
        if (change.type === "added") {


          const unsubFunction: Unsubscribe = listenToStatement(statementSubscription.statementId);

          const index = unsubscribes.findIndex((ls) => ls.statementId === statementSubscription.statementId);
          if (index === -1) {
            unsubscribes.push({ unsubFunction, statementId: statementSubscription.statementId });
          }


        }

        if (change.type === "removed") {

          const index = unsubscribes.findIndex((ls) => ls.statementId === statementSubscription.statementId);
          if (index !== -1) {
            unsubscribes[index].unsubFunction();
            unsubscribes.splice(index, 1);
          }

          dispatch(deleteStatement(statementSubscription.statementId));
        }
      });
    });


  } catch (error: any) {
    console.error(error);
    setError(error.message);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => { };
  }


};

export const listenToStatement = (
  statementId: string,

): Unsubscribe => {
  try {
    const dispatch = store.dispatch;
    const statementRef = doc(DB, Collections.statements, statementId);

    return onSnapshot(
      statementRef,
      (statementDB: any) => {
        try {
          if (!statementDB.exists()) {

            throw new Error("Statement does not exist");
          }
          const statement = statementDB.data() as Statement;

          dispatch(setStatement(statement));
        } catch (error) {
          console.error(error)

        }
      },
      (error) => console.error(error),
    );
  } catch (error) {
    console.error(error);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => { };
  }
};

export async function getStatement(statementId:string):Promise<Statement | undefined>{
  try {
    const statementRef = doc(DB, Collections.statements, statementId);
    const statementDB = await getDoc(statementRef);
    if (!statementDB.exists()) throw new Error("Statement does not exist");
    return statementDB.data() as Statement;
  } catch (error) {
    return undefined
  }
}

export function listenToDocument(statementId: string|undefined): Unsubscribe {
  try {
    if (!statementId) throw new Error("No statementId provided");
    const dispatch = store.dispatch;
    const statementRef = collection(DB, Collections.statements);
    const q = query(statementRef, where("documentSettings.parentDocumentId", "==", statementId), where("statementSettings.show", "==", true), orderBy("documentSettings.order", "asc"));
    return onSnapshot(q, (documentsDB) => {
     const statements: Statement[] = [];
      documentsDB.forEach((docDB) => {
        statements.push(docDB.data() as Statement);
      });
       
      dispatch(setStatements(statements));

    }, (error) => { console.error(error) });
  } catch (error) {
    console.error(error);
    return () => { };
  }
}