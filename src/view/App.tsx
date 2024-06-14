import "./styles/globals.scss";
import { Statement } from "delib-npm";

import { useStatements } from "../controllers/hooks/statementsHooks";


function App() {

  const { statements, isLoading, error } = useStatements();
 
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: An error occurred.</div>;

  return (
    <>
      <div>
        <h1>Statements</h1>
        <section>
          {statements.map((statement: Statement) => (
            <div key={statement.statementId}>
              <h2>{statement.statement}</h2>
              <hr />
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default App;
