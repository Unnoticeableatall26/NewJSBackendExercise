const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

let authenticatedUsers = {};

router.post('/authenticate', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@example.com' && password === 'password') { // Simplified for example
        const token = uuidv4();
        authenticatedUsers[token] = { email };
        return res.json({ token });
    }
    res.status(403).json({ message: 'Invalid credentials' });
});

router.post('/register', (req, res) => {
    const { email, password } = req.body;
    // Logic to save user (hashed password recommended)
    res.json({ message: 'User registered successfully' });
});

module.exports = router;
