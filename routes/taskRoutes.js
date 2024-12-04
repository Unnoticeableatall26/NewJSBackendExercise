const express = require('express');
const { getConnection } = require('../db/db_utils');

const router = express.Router();

// Get all tasks from database
router.get('/all-tasks', (req, res) => {
    const connection = getConnection(); // Create a new connection
    connection.execute('SELECT * FROM tasks', (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            connection.end(); // Close connection on error
            return res.status(500).send('Database error');
        }
        connection.end(); // Close connection after query
        res.json(results);
    });
});

// Other routes...

module.exports = router;
