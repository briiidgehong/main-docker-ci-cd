const mysql = require("mysql");
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'admin',
    password: '1111',
    database: "myapp"
});

exports.pool = pool;