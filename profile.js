const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth"); // Middleware zur JWT-Überprüfung
const User = require("../models/User"); // User Model

// Profil abrufen (GET /api/profile)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Passwort auslassen
    if (!user) return res.status(404).json({ message: "User nicht gefunden" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Serverfehler" });
  }
});

// Profil aktualisieren (PUT /api/profile)
router.put("/", authMiddleware, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User nicht gefunden" });

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      // Passwort hashen (z.B. mit bcrypt)
      const bcrypt = require("bcryptjs");
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ message: "Profil aktualisiert", user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Serverfehler" });
  }
});

module.exports = router;