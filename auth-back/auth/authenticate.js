const getTokenFromHeader = require("./getTokenFromHeader");
const { verifyAccessToken } = require("./verifyTokens");

function authenticate(req, res, next) {
  const token = getTokenFromHeader(req.headers);

  if (token) {
    const decoded = verifyAccessToken(token);
    if (decoded) {
      req.user = { ...decoded.user };
      next();
    } else {
      res.status(401).send({ error: "No Token Provided" });
    }
  } else {
    res.status(401).send({ error: "No Token Provided" });
  }
}
module.exports = authenticate;