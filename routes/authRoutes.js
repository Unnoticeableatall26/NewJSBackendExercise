const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getConnection } = require('../db/db_utils'); // Import getConnection
const bcrypt = require('bcryptjs');

const router = express.Router();

// Register route (with hashed password)
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // Ensure email and password are provided
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    // Check if email is already in the database
    const connection = getConnection();
    connection.execute('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            connection.end();
            return res.status(500).send('Database error');
        }

        // If email exists, return a message
        if (results.length > 0) {
            connection.end();
            return res.status(400).send('Email already exists');
        }

        // Insert the new user with the hashed password
        connection.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (insertErr) => {
            connection.end(); // Close the connection after the operation
            if (insertErr) {
                return res.status(500).send('Error saving user');
            }
            res.status(200).send('User registered successfully');
        });
    });
});

// Route for authentication (Automatic Password Hashing)
router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    // Ensure email and password are provided
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    const connection = getConnection(); // Create a new connection to the database
    connection.execute('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            connection.end();
            return res.status(500).send('Database error');
        }

        // If no user is found, return invalid credentials
        if (results.length === 0) {
            connection.end();
            return res.status(403).send('Invalid credentials');
        }

        const user = results[0];

        // Check if the password is already hashed (bcrypt hashes start with '$2a$')
        let isMatch;
        if (user.password.startsWith('$2a$')) {
            // If password is hashed, compare the hashed password
            isMatch = await bcrypt.compare(password, user.password);
        } else {
            // If the password is not hashed, assume it’s plaintext and compare directly
            isMatch = (password === user.password);
        }

        // If the password doesn't match, return invalid credentials
        if (!isMatch) {
            connection.end();
            return res.status(403).send('Invalid credentials');
        }

        // If password matches, generate a token
        const token = uuidv4();
        connection.execute(
            'INSERT INTO authenticatedUsers (token, email) VALUES (?, ?)',
            [token, email],
            (insertErr) => {
                connection.end();
                if (insertErr) return res.status(500).send('Error saving token');
                res.json({ token });
            }
        );

        // If the password was not hashed, hash it and update the user's password in the database
        if (!user.password.startsWith('$2a$')) {
            const hashedPassword = await bcrypt.hash(password, 10);
            connection.execute(
                'UPDATE users SET password = ? WHERE email = ?',
                [hashedPassword, email],
                (updateErr) => {
                    if (updateErr) console.error('Error updating password', updateErr);
                }
            );
        }
    });
});

// Route for fetching users (for testing purposes)
router.get('/users', (req, res) => {
    const connection = getConnection(); // Create a new connection
    connection.execute('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            connection.end(); // Close connection on error
            return res.status(500).send('Database error');
        }
        connection.end(); // Close connection after query
        res.json(results);
    });
});

module.exports = router;
