import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./components/router.jsx";
import { RouterProvider } from "react-router-dom";
import { Navbar } from "./components/Navbar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
