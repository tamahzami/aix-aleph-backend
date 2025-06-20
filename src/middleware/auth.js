// src/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token fehlt' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token fehlt' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // z.B. { id: 'userId', email: '...' }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Ungültiger Token' });
  }
};