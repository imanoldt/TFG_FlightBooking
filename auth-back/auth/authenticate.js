const getTokenFromHeader = require("./getTokenFromHeader");
const { verifyAccessToken } = require("./verifyTokens");

function authenticate(req, res, next) {
  console.log("Authenticating user....");
  const token = getTokenFromHeader(req.headers);
  console.log("Token received:", token);



  if (token) {
    const decoded = verifyAccessToken(token);
    if (decoded) {
      console.log("Token is valid, user:", decoded.user);
      req.user = { ...decoded.user };
      console.log("User:", req.user);
      console.log("Decoded ...user", decoded.user);
      next();
    } else {
      console.log("Token is invalid or expired");
      res.status(401).send({ error: "Invalid or expired Token" });
    }
  } else {
    console.log("No token provided");
    res.status(401).send({ error: "No Token Provided" });
  }
}
module.exports = authenticate;