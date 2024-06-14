import { Statement } from "delib-npm";

import { useStatements } from "../../../controllers/hooks/statementsHooks";

import Header from "../../components/header/Header";

function Main() {

  const { statements, isLoading, error } = useStatements();

  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: An error occurred.</div>;

  return (
    <>
      <div>
        <Header />
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

export default Main;
