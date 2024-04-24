const express = require("express");
const cors = require("cors");

const app = express();
const mongoose = require("mongoose");
const authenticate = require("./auth/authenticate");

require("dotenv").config();

const port = process.env.PORT || 7080;

app.use(cors());
app.use(express.json());

async function connectDB() {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
  console.log("DB connected");
}

connectDB().catch(console.error); //CONEXION DB

app.use("/api/signup", require("./routes/signup"));
app.use("/api/login", require("./routes/login"));
app.use("/api/user",authenticate, require("./routes/user"));
app.use("/api/todo", authenticate, require("./routes/todo"));
app.use("/api/refresh-token", require("./routes/refreshToken"));
app.use("/api/signout", require("./routes/signout"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
