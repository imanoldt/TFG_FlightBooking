const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const findOrCreate = require("mongoose-findorcreate");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passportLocalMongoose = require("passport-local-mongoose");
const session = require('express-session')

const influxDBHandler = require('./routes/handleInfluxdb');

const authenticate = require("./auth/authenticate");

const { queryAvailableDates, queryUniqueAirlines, queryFlightPrices } = require('./routes/handleInfluxdb');

require("dotenv").config();
const port = process.env.PORT || 7903;

// GOOGLE OAUTH STRATEGY


app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,

}))
//init  passport
app.use(passport.initialize());
app.use(passport.session());

// USUARIO OUTH

const Schema = mongoose.Schema;
const usuarioSechema = new Schema({
  username: String,
  googleId: String,
});

// HALT && SALT
usuarioSechema.plugin(passportLocalMongoose);
// FIND OR CREATE
usuarioSechema.plugin(findOrCreate);

const Usuario = new mongoose.model("User_Outh", usuarioSechema);
passport.use(Usuario.createStrategy());

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:7903/api/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      Usuario.findOrCreate({ googleId: profile.id }, {username: profile.displayName}, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

app.use(cors());
app.use(express.json());

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
  console.log("Connected to MongoDB");
}

main().catch(console.error());

app.use("/api/signup", require("./routes/signup"));
app.use("/api/login", require("./routes/login"));
app.use("/api/user", authenticate, require("./routes/user"));
app.use("/api/signout", require("./routes/signout"));
app.use("/api/todos", authenticate, require("./routes/todos"));
app.use("/api/refresh-token", require("./routes/refreshToken"));
app.use("/api/city-images", require("./routes/cities"));
app.use("/api/rutas", require("./routes/rutas"));



// ----------------------------

// Endpoint para obtener precios de vuelos
app.get('/api/flight-prices', async (req, res) => {
  const { departure, arrival, airline } = req.query; // Asegúrate que los parámetros son enviados en la query
  try {
      const prices = await influxDBHandler.queryFlightPrices(departure, arrival, airline);
      res.json(prices);
  } catch (error) {
      res.status(500).send(error.toString());
  }
});

// Endpoint para obtener fechas disponibles para vuelos
app.get('/api/available-dates/:cityName', async (req, res) => {
  console.log(`Fetching available dates for airport: ${req.params.cityName}`);  // Imprime el aeropuerto recibido
  try {
      const dates = await queryAvailableDates(req.params.cityName);
      res.json(dates);
  } catch (error) {
      console.error(`Failed to fetch dates for ${req.params.cityName}:`, error);
      res.status(500).send(error.toString());
  }
});

// Endpoint para obtener aerolíneas únicas para un aeropuerto
app.get('/api/unique-airlines/:cityName', async (req, res) => {
  try {
      const airlines = await queryUniqueAirlines(req.params.cityName);
      res.json(airlines);
  } catch (error) {
      console.error(`Failed to fetch airlines for ${req.params.cityName}:`, error);
      res.status(500).send(error.toString());
  }
});

app.get('/api/flight-price-history', async (req, res) => {
  const { city, airline, startDate, endDate } = req.query;
  try {
      const prices = await influxDBHandler.queryFlightPrices(city, airline, startDate, endDate);
      res.json(prices);
  } catch (error) {
      console.error(`Failed to fetch flight prices: ${error}`);
      res.status(400).send(error.message);
  }
});




// --------------------------------






// Google Oauth
app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// Luego en tu endpoint de callback, puedes redirigir al dashboard del frontend
app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/api/login" }),
    function (req, res) {
      // Redirigir al frontend una vez que se ha autenticado con éxito
      res.redirect("http://localhost:7903/api/auth/google/dashboard");
    }
  );

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
