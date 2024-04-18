const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");
const getUserInfo = require("../lib/getUserInfo");


router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json(jsonResponse(400, { error: "Invalid username or password" }));
  }

  try {
    const user = await User.findOne({ userEmail: username });
    if (!user) {
      return res
        .status(400)
        .json(jsonResponse(400, { error: "User not found" }));
    }

    const isPasswordValid = await user.comparePassword(password, user.password);
    if (isPasswordValid) {
      // Si la contraseña es válida, genera tokens de acceso y actualización
      const accessToken = user.createAccessToken();
      const refreshToken = await user.createRefreshToken();

      return res
        .status(200)
        .json(
          jsonResponse(200, {
            user: getUserInfo(user),
            accessToken,
            refreshToken,
          })
        );
    } else {
      return res
        .status(400)
        .json(jsonResponse(400, { error: "Password not found" }));
    }
  } catch (error) {
    console.error("Error validating user credentials:", error);
    return res
      .status(500)
      .json(jsonResponse(500, { error: "Internal server error" }));
  }
});

module.exports = router;
