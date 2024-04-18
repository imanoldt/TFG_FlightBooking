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
import SignUp from "./routes/SignUp.jsx";
import Login from "./routes/Login.jsx";
import DefaultLayoutLogin from "./layout/DefaultLayoutLogin.jsx";

const router = createBrowserRouter([
  {
    path: "/" /*RUTA PROTEGIDA*/,
    element: <ProtectedRoute />,
    children: [{ path: "/app", element: <App /> }],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <DefaultLayoutLogin />,
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
