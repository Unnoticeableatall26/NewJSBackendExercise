const { getConnection } = require('../db/db_utils');

const authMiddleware = (req, res, next) => {

    const dynamicMiddleware = (req, res, next) => {
        if (!req.headers['x-demo']) {
            return res.status(400).send('Bad Request: Missing demo header');
        }
        console.log('Middleware passed');
        next(); // Proceed to the next middleware/route
    };
    

    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send('Forbidden: No token provided');
    }

    const connection = getConnection();
    connection.execute('SELECT * FROM authenticatedUsers WHERE token = ?', [token], (err, results) => {
        if (err || results.length === 0) {
            return res.status(403).send('Forbidden: Invalid token');
        }
        next();
    });
};

module.exports = { authMiddleware };

