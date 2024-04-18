import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";

export default function SignUpForm() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorResponse, setErrorResponse] = useState("");
  const auth = useAuth();

  const goTo = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        console.log("Sign up successful");
        setErrorResponse("");
        goTo("/");
      } else {
        console.error("Sign up failed");
        const json = await response.json();
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/app" />;
  }

  return (
    <div className="w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
      <h1 className="text-5xl text-center font-semibold">SkySculptor</h1>
      {!! errorResponse && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{errorResponse}</div>}
      <p className="font-medium text-lg text-center text-gray-500 mt-4">
        Tu recomendador de rutas de vuelo
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mt-8">
          <div className="flex flex-col">
            <label className="text-lg font-medium">Email</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Introduce tu email"
              type="email"
              value={username}
              onChange={(e) => setEmail(e.target.value)}
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
            <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-red-500 rounded-xl text-white font-bold text-lg">
              Registrarse
            </button>
            <button className="ml-2 font-medium text-base text-red-500">
              ¿Ya tienes una cuenta? Inicia sesión
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
