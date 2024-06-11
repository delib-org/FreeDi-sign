import { collection, getDocs, query, where } from "firebase/firestore";
import {DB} from '../config';
import { Collections, Statement } from "delib-npm";

export async function getStatements():Promise<Statement[]> {
  try {
    const statementsRef = collection(DB, Collections.statements);
    const q = query(statementsRef,where("creatorId", "==", "JbyXRCUOaBs4tHAbxzoE5qWhqmDr"));
    const querySnapshot = await getDocs(q);
    const statements:Statement[] = [];
    querySnapshot.forEach((doc:any) => {
      statements.push(doc.data() as Statement);
    });

    return statements;

  } catch (error) {
    console.error("Error getting statements: ", error);
    return [];
  }
}