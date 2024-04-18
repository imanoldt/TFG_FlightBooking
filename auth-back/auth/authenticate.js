const { jsonResponse } = require("../lib/jsonResponse");
const getTokenFromHeader = require("./getTokenFromHeader");
const { validateAccessToken } = require("./validateToken");

function authenticate(req, res, next) {
    const token = getTokenFromHeader(req.headers);



  if (token) {

    const decode = validateAccessToken(token);
    if(decode){
        req.user = { ... decode.user};
        next();

    }else{
        res.status(401).json(jsonResponse(401, { error: "No Token Provided" }));
    }
    
  }
  else {
    res.status(401).json(jsonResponse(401, { error: "No Token Provided" }));
  }
  res.redirect('/login');
}

module.exports = authenticate;