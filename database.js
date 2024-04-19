var mysql = require("mysql");

var connection =mysql.createConnection({
    host:'localhost',
    database:'project_managment_2',
    user: 'root',
    password: '12345678'
});



module.exports = connection;