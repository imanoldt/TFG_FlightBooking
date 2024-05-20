import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./routes/Dashboard.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import DefaultLayoutLogin from "./layout/DefaultLayoutLogin.tsx";
import DefaultLayoutSignUp from "./layout/DefaultLayoutSignUp.tsx";
import CityPage from "./routes/CityPage";
import Rutas from "./routes/Rutas";
import Profile from "./routes/Profile.tsx";
import { SettingsProvider } from "./utils/SettingsContext.tsx";
import Buscador from "./routes/Buscador.tsx";
import Contacto from "./routes/Contacto.tsx";
import TravelPhotos from "./routes/TravelPhotos.tsx";

const router = createBrowserRouter([
  { path: "/", element: <DefaultLayoutLogin /> },
  { path: "/signup", element: <DefaultLayoutSignUp /> },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "buscador", element: <Buscador /> },
    ],
  },
  { path: "/rutas", element: <Rutas /> },
  {
    path: "/city/:cityName",
    element: <CityPage />,
  },
  {
    path: "/perfil",
    element: <Profile />,
  },
  {
    path: "/contacto",
    element: <Contacto />,
  },
  {
    path: "/travel-photos",
    element: <TravelPhotos />,

  },

]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <SettingsProvider>
        <RouterProvider router={router} />
      </SettingsProvider>
    </AuthProvider>
  </React.StrictMode>
);
