import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Toaster richColors position="top-center" />
    <RouterProvider router={router} />
  </React.StrictMode>
);
