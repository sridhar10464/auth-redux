const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const passport = require("passport");
const BlacklistToken = require('../models/BlacklistTokenModel');
const LocalStrategy = require("passport-local").Strategy;

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
  

const registerController = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.json({ message: 'User registered successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
};

const loginController = async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
          return res.status(500).json({ error: 'Internal server error' });
        }
        if (!user) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
      })(req, res, next);
};

const protectedController = async (req, res) => {
    res.json({ message: 'Protected route accessed' });
};

const logoutController = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        const decodedToken = jwt.decode(token);
        const expirationTime = new Date(decodedToken.exp * 1000);
        const blacklistToken = new BlacklistToken({ token, expiresAt: expirationTime });
        await blacklistToken.save();
        res.json({ message: 'Logout successful' });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    
};

module.exports = { registerController, loginController, protectedController, logoutController }