const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Dein User Model
const { JWT_SECRET } = process.env;

// Middleware zum Prüfen des JWT-Tokens
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token fehlt" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token ungültig" });
    req.user = user;
    next();
  });
}

router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "Benutzer nicht gefunden" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Serverfehler" });
  }
});

router.put("/", authenticateToken, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Benutzer nicht gefunden" });

    // Update Felder
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      // Passwort hashen (z.B. mit bcrypt)
      const bcrypt = require("bcrypt");
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    // Keine Passwörter zurückgeben
    const userObj = user.toObject();
    delete userObj.password;

    res.json({ message: "Profil aktualisiert", user: userObj });
  } catch (err) {
    res.status(500).json({ message: "Serverfehler" });
  }
});

module.exports = router;