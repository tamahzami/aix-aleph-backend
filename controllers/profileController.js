// controllers/profileController.js
const User = require('../models/User');

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, email } = req.body;

  try {
    // Optional: Validierung (einfache Beispiel-Validierung)
    if (!name || !email) {
      return res.status(400).json({ message: 'Name und Email sind erforderlich' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    res.json({
      message: 'Profil erfolgreich aktualisiert',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error('Profil-Update-Fehler:', error);
    res.status(500).json({ message: 'Interner Serverfehler' });
  }
};