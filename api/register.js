// routes/auth.js – ergänzen
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: 'Alle Felder erforderlich' });

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(409).json({ error: 'Benutzer existiert bereits' });

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'Benutzer erstellt', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});