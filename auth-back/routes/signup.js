const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  if (!username || !name || !password) {
    return res
      .status(400)
      .json(jsonResponse(400, { error: "Fields are required" }));
  }

  try {
    const exists = await User.findOne({ username });

    if (exists) {
      return res
        .status(400)
        .json(jsonResponse(400, { error: "User already exists" }));
    }

    const newUser = new User({ username, name, password });

    await newUser.save();

    res
      .status(200)
      .json(jsonResponse(200, { message: "User created successfully" }));
  } catch (error) {
    res.status(500).json(jsonResponse(500, { error: "Error creating user" }));
  }
});

module.exports = router;
