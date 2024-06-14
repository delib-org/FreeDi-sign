import { createBrowserRouter } from "react-router-dom";
import App from "../view/App";
import Login from "../view/pages/login/Login";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
        path: "/404",
        element: <div>404 Not Found</div>,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "*",
        element: <div>404 Not Found</div>,
    },
  ]);