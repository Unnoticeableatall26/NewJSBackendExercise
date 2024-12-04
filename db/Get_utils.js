
const connection = getConnection();
connection.execute('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    console.log('Users1:', results);
});
connection.end();