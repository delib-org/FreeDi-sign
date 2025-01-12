import { createBrowserRouter } from "react-router-dom";
import App from "../view/App";
import Login from "../view/pages/login/Login";
import Main from "../view/pages/main/Main";
import Document from "../view/pages/doc/Document";
import Page404 from "../view/pages/page404/Page404";
import Page401 from "../view/pages/page401/Page401";
import CommentsModal from "../view/pages/doc/paragraph/evaluation/importance/comments/commentsModal/CommentsModal ";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/doc/:statementId",
        element: <Document />,
        children: [
          {
            path: "comments/:paragraphId",
            element: <CommentsModal />
          }
        ]
      },
      {
        path: "/doc-anonymous/:statementId",
        element: <Document />,
        children: [
          {
            path: "comments/:paragraphId",
            element: <CommentsModal />
          }
        ]
      }
    ],
  },
  {
    path: "/404",
    element: <Page404 />,
  },
  {
    path: "/401",
    element: <Page401 />
  },
  {
    path: "*",
    element:  <Page404 />,
  },
]);
