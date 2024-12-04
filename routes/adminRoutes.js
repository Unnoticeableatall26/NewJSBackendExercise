const express = require('express');
const { getConnection } = require('../db/db_utils');
const router = express.Router();

// Middleware to check if the user is an admin
const checkAdmin = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).send('Access denied');
    
    const connection = getConnection();
    connection.execute('SELECT * FROM authenticatedUsers WHERE token = ?', [token], (err, results) => {
        if (err || results.length === 0) return res.status(403).send('Access denied');
        if (results[0].email !== 'admin@example.com') {
            return res.status(403).send('Access denied: not an admin');
        }
        next();
    });
};

// Route to get all users (admin only)
router.get('/users', checkAdmin, (req, res) => {
    const connection = getConnection();
    connection.execute('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).send('Database error');
        res.json(results);
    });
});

module.exports = router;
