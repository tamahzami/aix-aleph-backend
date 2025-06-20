const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('❌ Fehler: MONGO_URI fehlt.');
  process.exit(1);
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB verbunden'))
.catch(err => {
  console.error('❌ MongoDB-Verbindungsfehler:', err.message);
  process.exit(1);
});

module.exports = mongoose;