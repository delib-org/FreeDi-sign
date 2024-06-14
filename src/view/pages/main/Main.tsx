import { Statement } from "delib-npm";

import { useStatements } from "../../../controllers/hooks/statementsHooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../controllers/slices/userSlice";
import { useEffect } from "react";
import { logOut } from "../../../controllers/db/authCont";

function Main() {

  const { statements, isLoading, error } = useStatements();

  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: An error occurred.</div>;

  return (
    <>
      <div>
        <h1>Statements <button onClick={logOut}>Log out </button></h1>
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
