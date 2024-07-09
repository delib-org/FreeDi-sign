import { createBrowserRouter } from "react-router-dom";
import App from "../view/App";
import Login from "../view/pages/login/Login";
import Main from "../view/pages/main/Main";
import Document from "../view/pages/doc/Document";

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
      }
    ],
  },
  {
    path: "/404",
    element: <div>404 Not Found</div>,
  },

  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);
