import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { AuthProvider } from "./auth/AuthProvider.jsx";

import DefaultLayoutLogin from "./layout/DefaultLayoutLogin.jsx";
import DefaultLayoutSignUp from "./layout/DefaultLayoutSignUp.jsx";
import DefaultCityLayout from "./layout/DefaultCityLayout.jsx";


const router = createBrowserRouter([
  {
    path: "/" /*RUTA PROTEGIDA*/,
    element: <ProtectedRoute />,
    //DESCOMENTAR LUEGO
    //children: [{ path: "/app", element: <App /> }],
  },
  {
    path: "/signup",
    element: <DefaultLayoutSignUp />,
  },
  {
    path: "/login",
    element: <DefaultLayoutLogin />,
  },
  //ELIMINAR LUEGO
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/city/:cityName",
    element: <DefaultCityLayout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
