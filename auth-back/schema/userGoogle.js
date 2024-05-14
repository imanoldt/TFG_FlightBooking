const mongoose = require("mongoose");

const UserGoogleSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    // Otros campos relevantes que quieras almacenar, como imagen de perfil, etc.
});

module.exports = mongoose.model("UserGoogle", UserGoogleSchema);
