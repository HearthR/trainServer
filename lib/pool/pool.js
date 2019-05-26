var mysql = require('mysql')
let db_config = require('./db-config.json');
var pool = mysql.createPool(db_config);

pool.on('connection', conn => {
    console.log("DB connection established!");

    conn.on('error', err => {
        console.error(new Date(), 'DB error', err.code);
    });

    conn.on('close', err => {
        console.error(new Date(), 'DB connection closed', err);
    });
});

module.exports = pool;