import { useState, useEffect } from "react";
import "./styles/globals.scss";
import { getStatements } from "../controllers/db/statements/getStatements";
import { Statement } from "delib-npm";

function App() {
  const [statements, setStatements] = useState<Statement[]>([]);

  useEffect(() => {
    (async () => {
      const _statements = await getStatements();

      setStatements(_statements);
    })();
  }, []);
  return (
    <div>
      <h1>Statements</h1>
      <section>
        {statements.map((statement) => (
          <div key={statement.statementId}>
            <h2>{statement.statement}</h2>
            <hr />
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
