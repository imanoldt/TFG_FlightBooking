import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constant";
import { AuthResponseError } from "../types/types";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState(""); // [1

  const auth = useAuth();
  const goTo = useNavigate();

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, password }),
      });

      if (response.ok) {
        console.log("Usuario creado correctamente");
        setErrorResponse("");

        goTo("/");

      } else {
        console.error("Error al crear el usuario");
        const json = await response.json() as AuthResponseError;
        setErrorResponse(json.body.error);
        return;

      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
      <h1 className="text-5xl text-center font-semibold">SkySculptor</h1>
{errorResponse && 

      <div className="p-4 text-center bg-red-100 border border-red-400 text-red-700 rounded relative animate-pulse">{errorResponse}</div>
}
      <p className="font-medium text-lg text-center text-gray-500 mt-4">
        Tu recomendador de rutas de vuelo
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="mt-8">
          <div className="flex flex-col ">
            <label className="text-lg font-medium">Nombre</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Introduce tu nombre"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-lg font-medium">Email</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Introduce tu email"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-lg font-medium">Contraseña</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Introduce la contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-8 flex justify-between items-center">
            <button className="w-full active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-red-500 rounded-xl text-white font-bold text-lg">
              Crear Usuario
            </button>
            <Link to="/">
              <button className="ml-2 font-medium text-base text-red-500">
                ¿Ya tienes una cuenta? Inicia sesión
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
