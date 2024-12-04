const mysql = require('mysql2');

// Function to create a new connection
const getConnection = () => {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
};

// Example query for debugging purposes (can be removed in production)
const connection = getConnection();
connection.execute('SELECT * FROM users', (err, results) => {
    if (err) {
        console.error('Database Error:', err);
    } else {
        console.log('Users:', results);
    }
    connection.end(); // Close the connection after use
});

module.exports = { getConnection };
