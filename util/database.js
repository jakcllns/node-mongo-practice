const postgres = require('pg');

const pool = new postgres.Pool({
    host: 'localhost',
    user: 'jakcllns',
    database: 'node-complete',
    password: 'jake1989'
});

module.exports = pool;



