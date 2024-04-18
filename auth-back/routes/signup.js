const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");

router.post("/", async (req, res) => { // Marca la función como async
  const { username, password } = req.body;

  if (!!!username && !!!password) {
    return res
      .status(400)
      .json(jsonResponse(400, { error: "Invalid username or password" }));
  }


  const user =new User();
  const userExist = await user.usernameExists(username);

  if (userExist){
    return res
      .status(400)
      .json(jsonResponse(400, { error: "User already exists" }));
  }

  try {
    // Crear un nuevo usuario
    const newUser = new User({ userEmail: username, password });
    await newUser.save();

    return res.status(200).json(jsonResponse(200, { message: "User created" }));
  
    // Validar la seguridad de la contraseña
    if (password.length < 8) {
        return res.status(400).json(jsonResponse(400, { error: "Password must be at least 8 characters long" }));
      }


} catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json(jsonResponse(500, { error: "Internal server error" }));
  }
});
  
module.exports = router;
