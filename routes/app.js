const express = require('express');
const path = require('path');

const app = express();

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statische Dateien: Uploads (z.B. Avatare) öffentlich machen
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Beispiel: Routen importieren und verwenden
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// 404-Handler für unbekannte Routen
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ressource nicht gefunden' });
});

// Zentrale Fehlerbehandlung
app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.status || 500;
  const message = err.message || 'Interner Serverfehler';

  res.status(statusCode).json({ message });
});

module.exports = app;