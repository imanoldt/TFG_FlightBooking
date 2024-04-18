const mongoose = require("mongoose"); // Importa mongoose
const bcrypt = require("bcrypt"); // Importa bcrypt
const getUserInfo = require("../lib/getUserInfo"); // Importa getUserInfo
const Token = require("./token"); // Importa Token
const {generateAccessToken, generateRefreshToken} = require("../auth/generateTokens")

///METODOS PARA MANEJAR USUARIOS

const UserSchema = new mongoose.Schema({
  id: { type: Object },
  userEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    const document = this;
    bcrypt.hash(document.password, 10, (err, hash) => {
      if (err) {
        next(err);
      } else {
        document.password = hash;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.usernameExists = async function (username) {
  const result = await mongoose.model("User").find({ username: username });
  return result.length > 0;
};
UserSchema.methods.comparePassword = async function (password, callbackHash) {
  return await bcrypt.compare(password, callbackHash);
};

UserSchema.methods.createAccessToken = function () {
  return generateAccessToken(getUserInfo(this));
};
UserSchema.methods.createRefreshToken = async function () {
  const refreshToken = generateRefreshToken(getUserInfo(this));

  try {
    await new Token({ token: refreshToken }).save();

    return refreshToken;
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model("User", UserSchema);
