const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  getMe
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const {
  signupValidator,
  loginValidator
} = require("../validators/authValidator");

const validateMiddleware = require("../middleware/validateMiddleware");

// Signup
router.post("/signup", signupValidator, validateMiddleware, signup);

// Login
router.post("/login", loginValidator, validateMiddleware, login);

// Logout
router.post("/logout", logout);

// Get logged-in user
router.get("/me", authMiddleware, getMe);

module.exports = router;