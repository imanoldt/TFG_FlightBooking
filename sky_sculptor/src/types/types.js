export const AuthResponse = {
  body: {
    user: "User",
    accessToken: "",
    refreshToken: "",
  },
};

export const AuthResponseError = {
  body: {
    error: "",
  },
};

export const User = {
  _id: "",
  email: "",
};

export const AccessTokenResponse = {
  statusCode: 200, // Por ejemplo, puedes cambiar el valor según sea necesario
  body: {
    accessToken: "",
  },
  // Opcionalmente, puedes incluir una propiedad de error
  error: "",
};
