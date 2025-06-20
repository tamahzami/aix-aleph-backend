const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Ungültige E-Mail-Adresse'),
    body('password').isLength({ min: 6 }).withMessage('Passwort muss mindestens 6 Zeichen lang sein'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'E-Mail bereits vergeben' });

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({ email, password: hashedPassword });

      await newUser.save();

      res.status(201).json({ message: 'Benutzer erfolgreich registriert' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Serverfehler' });
    }
  }
);

module.exports = router;