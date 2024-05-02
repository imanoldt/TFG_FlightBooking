const getUserInfo = require("../lib/getUserInfo");
const { jsonResponse } = require("../lib/jsonResponse");
const router = require("express").Router();
const User = require("../schema/user");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json(jsonResponse(400, { error: "Fields are required" }));
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json(jsonResponse(400, { error: "User not found" }));
  }

  const correctPassword = await user.comparePassword(password);
  if (!correctPassword) {
    return res.status(400).json(jsonResponse(400, { error: "User or Password Incorrect" }));
  }

  const accessToken = user.createAccessToken();
  const refreshToken = await user.createRefreshToken();

  res.status(200).json(jsonResponse(200, { user: getUserInfo(user), accessToken, refreshToken }));
});

module.exports = router;
