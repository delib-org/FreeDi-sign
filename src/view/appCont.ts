import { NavigateFunction, Params } from "react-router-dom";

export function navigateToDocument(params: Readonly<Params<string>>, navigate: NavigateFunction) {
    const { statementId } = params;
    if (statementId) {
      navigate(`/doc/${statementId}`);
    } else {
      const _statementId = localStorage.getItem("statementId");
      if (_statementId) {
        navigate(`/doc/${_statementId}`);
      } else {
        navigate("/404");
      }
    }
  }