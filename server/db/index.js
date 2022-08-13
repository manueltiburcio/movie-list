const mysql = require('mysql2');

// create the conection to database
const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'movielist',
});

module.exports = connection;