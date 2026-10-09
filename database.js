var mysql = require("mysql");

var connection =mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'project_managment_2',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
});



module.exports = connection;