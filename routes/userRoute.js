const express = require("express");
const { registerController, loginController, protectedController, logoutController } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/protected", protectedController);

router.post("/logout", logoutController);

module.exports = router;