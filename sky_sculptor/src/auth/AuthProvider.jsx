import React, { useContext, useState, useMemo, useEffect } from "react";
import { AuthResponse, AccessTokenResponse, User } from "../types/types";
import { API_URL } from "./constants";

const AuthContext = React.createContext({
  isAuthenticated: false,
  getAccessToken: () => "",
  saveUser: (userData) => {},
  getRefreshToken: () => "",
  getUser: () => ({}),
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState({ AuthResponse });
  //const [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  async function requestNewAccessToken(refreshToken) {
    // Función para solicitar un nuevo token de acceso (FALLAAAAAAAAAAAAA)
    try {
      const response = await fetch(`${API_URL}/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });
  
      if (response.ok) {
        const json = await response.json();
  
        if (json.error) {
          throw new Error(json.error);
        }
        return json.body.accessToken;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  async function getUserInfo(accessToken) {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        if (json.error) {
          throw new Error(json.error);
        }
        return json.body;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function checkAuth() {
    if (accessToken) {
      // Usuario autenticado correctamente
    } else {
      // Usuario no autenticado correctamente
      const token = getRefreshToken();

      if (token) {
        // Aquí puedes realizar acciones adicionales si hay un token de actualización disponible
        const newAccessToken = await requestNewAccessToken(token);
        if (newAccessToken) {
          const userInfo = await getUserInfo(newAccessToken);
          if (userInfo) {
            saveSessionInfo(userInfo, newAccessToken, token);
          }
        }
      }
    }
  }

  function getUser() {
    return user;
  }

  function saveSessionInfo(userInfo, accessToken, refreshToken) {
    setAccessToken(accessToken);
    localStorage.setItem("token", JSON.stringify(refreshToken));
    setIsAuthenticated(true);
    setUser(userInfo);
  }

  function getAccessToken() {
    return accessToken;
  }

  function getRefreshToken() {
    const tokenData = localStorage.getItem("token");
    console.log("Token Data:", tokenData); // Verifica el valor de tokenData
  
    if (tokenData) {
      try {
        const token = JSON.parse(tokenData);
        return token;
      } catch (error) {
        console.error("Error parsing token data:", error);
        return null;
      }
    }
    return null;
  }

  function saveUser(userData) {
    saveSessionInfo(
      userData.body.user,
      userData.body.accessToken,
      userData.body.refreshToken
    );
  }

  const authValue = useMemo(
    () => ({
      isAuthenticated,
      getAccessToken,
      saveUser,
      getRefreshToken,
      getUser,
    }),
    [isAuthenticated, getAccessToken, saveUser, getRefreshToken, getUser]
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
