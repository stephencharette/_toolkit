import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Rails from "./routes/Rails";
import RailsGenerators from "./components/rails/generators/Generators";
import reportWebVitals from "./reportWebVitals";
import Root from "./routes/root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth } from "./Auth";
// import { useContext } from "react";
import { UserProvider } from "./UserContext";
import Library from "./components/Library";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "library",
        element: <Library />,
      },
      {
        path: "rails",
        element: <Rails />,
        children: [
          {
            path: "generators",
            element: <RailsGenerators />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
