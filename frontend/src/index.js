const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User signuped successfully');
  } catch (error) {
    console.error("Registration Error:", error); // Detaillierte Ausgabe der Fehlermeldung im Server-Log
    res.status(500).send('Error signuping new user');
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).send('Invalid email or password');
    }
    const token = jwt.sign({ userId: user._id }, 'secretKey');
    res.send({ token });
  } catch (error) {
    res.status(500).send('Error logging in user');
  }
});

module.exports = router;
