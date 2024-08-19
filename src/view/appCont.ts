import { NavigateFunction, Params } from "react-router-dom";
import { store } from "../model/store";

export function navigateToDocument(params: Readonly<Params<string>>, navigate: NavigateFunction) {
    const { statementId } = params;
    const user = store.getState().user.user;

    const anonymousUrl = user?.isAnonymous ? "doc-anonymous" : "doc";

    
    if (statementId) {
      navigate(`/${anonymousUrl}/${statementId}`);
    } else {
      const _statementId = localStorage.getItem("statementId");
      if (_statementId) {
        navigate(`/${anonymousUrl}/${_statementId}`);
      } else {
        navigate("/404");
      }
    }
  }