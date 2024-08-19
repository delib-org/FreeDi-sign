import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./model/store.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./controllers/router.tsx";
import {
  LanguageProvider,
  LanguagesEnum,
} from "./controllers/hooks/useLanguage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <LanguageProvider defaultLanguage={LanguagesEnum.he}>
        <RouterProvider router={router} />
      </LanguageProvider>
    </Provider>
  </React.StrictMode>
);
