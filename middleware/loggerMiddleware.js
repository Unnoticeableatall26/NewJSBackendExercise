const loggerMiddleware = (req, res, next) => {
    console.log(`New request: ${req.method} ${req.url}`);
    next();
};

module.exports = loggerMiddleware;

// const dynamicMiddleware = (req, res, next) => {
//     if (!req.headers['x-demo']) {
//         return res.status(400).send('Bad Request: Missing demo header');
//     }
//     console.log('Middleware passed');
//     next();
// };

const dynamicMiddleware = (req, res, next) => {
    console.log('Middleware triggered'); // Log the middleware was triggered
    next(); // Proceed to the next middleware/route without checking for x-demo
};


module.exports = { dynamicMiddleware };
