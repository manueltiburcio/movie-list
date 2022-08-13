const db = require('../db');

module.exports = {
  getAll: function (callback) {
    console.log('model test');
    // get all movies
    var queryStr = 'SELECT * FROM movies';
    db.query(queryStr, function(err, results) {
      callback(err, results);
    });

  }, // a function which produces all the movies
  create: function (params, callback) {
    // create a message for a user id based on the username
    var queryStr = 'INSERT INTO movies(title) VALUES(?)';
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  } // a function which can be used to insert a movie into the database
};