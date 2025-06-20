// src/middleware/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Zielordner sicherstellen
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Speicherstrategie definieren
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

// Nur Bilder erlauben
const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.startsWith("image/");
  cb(null, isImage);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;