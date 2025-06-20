const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Token aus Header auslesen
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Kein Token, Zugriff verweigert" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Userdaten aus Token (z.B. id)
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token ungültig oder abgelaufen" });
  }
};