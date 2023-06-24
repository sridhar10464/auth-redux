const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
require("colors");

// dotenv.config
dotenv.config();

// db config
connectDb();

// rest object
const app = express();

// Configure passport local strategy
passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));
  
  // Middleware to handle user authentication
  app.use(passport.initialize());
  

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// routes
app.use("/api/users", require("./routes/userRoute"))

const PORT = process.env.PORT || 8080

// listen
app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`. bgCyan.white)
});