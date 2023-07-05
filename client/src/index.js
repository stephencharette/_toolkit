import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Rails from "./routes/Rails";
import RailsGenerators from "./components/rails/generators/Generators";
import RailsFormHelpers from "./components/rails/form_helpers/FormHelpers";
import reportWebVitals from "./reportWebVitals";
import Root from "./routes/root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth } from "./Auth";
// import { useContext } from "react";
import { UserProvider } from "./contexts/UserContext";
import Library from "./routes/Library";
import Settings from "./routes/Settings";

import { FormHelperProvider } from "./contexts/FormHelperProvider";
import { CopyToClipboardProvider } from "./contexts/CopyToClipboardProvider";
import { EditorThemeProvider } from "./contexts/EditorThemeProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "library",
        element: (
          <EditorThemeProvider>
            <Library />
          </EditorThemeProvider>
        ),
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "rails",
        element: <Rails />,
        children: [
          {
            path: "generators",
            element: <RailsGenerators />,
          },
          {
            path: "form_helpers",
            element: (
              <FormHelperProvider>
                <RailsFormHelpers />
              </FormHelperProvider>
            ),
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <CopyToClipboardProvider>
        <RouterProvider router={router} />
      </CopyToClipboardProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
