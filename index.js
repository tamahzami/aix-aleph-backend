require('dotenv').config();   // 1. Zeile - Umgebungsvariablen laden
const express = require('express');  // 2. Zeile
const app = express();

// JSON-Parsing Middleware aktivieren
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hallo vom API-Server!');
});

// Beispiel-POST-Route, um JSON-Daten zu empfangen
app.post('/daten', (req, res) => {
  console.log('Empfangene JSON-Daten:', req.body);
  res.json({ message: 'Daten erhalten', empfangen: req.body });
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});