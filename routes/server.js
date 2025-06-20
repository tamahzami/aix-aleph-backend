const express = require('express');
const app = express();
const path = require('path');

// ... deine anderen Middlewares

// Ordner öffentlich machen
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ... deine Routen etc.

module.exports = app;