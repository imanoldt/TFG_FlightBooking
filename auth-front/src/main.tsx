import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./routes/Dashboard.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import DefaultLayoutLogin from "./layout/DefaultLayoutLogin.tsx";
import DefaultLayoutSignUp from "./layout/DefaultLayoutSignUp.tsx";
import DefaultLayoutTemplate from "./layout/DefaultLayoutTemplate.tsx";
import CityPage from "./routes/CityPage";
import Rutas from "./routes/Rutas";

const router = createBrowserRouter([
  { path: "/", element: <DefaultLayoutLogin /> },
  { path: "/signup", element: <DefaultLayoutSignUp /> },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [{ path: "dashboard", element: <Dashboard /> }],
  },
  { path: "/rutas", element: <Rutas /> },
  {
    path: "/city/:cityName",
    element: <CityPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
