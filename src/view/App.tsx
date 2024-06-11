
import "./styles/globals.scss";
import { getStatements } from "../controllers/db/statements/getStatements";
import { Statement } from "delib-npm";
import { useQuery } from 'react-query';


function App() {
 

  const { isLoading, error, data: statements = [] } = useQuery(
    ['statements'],
    async () => {
      const _statements:Statement[] = await getStatements();
      return _statements;
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: An error occurred.</div>;

  return (
    <>
    <div>
      <h1>Statements</h1>
      <section>
        {statements.map((statement:Statement) => (
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
