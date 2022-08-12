const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
const db = require('./db');

// start our first query
db.query(
  'SELECT * FROM `movies`',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
  }
)

app.use(express.static('client/dist'));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})

// GET MOVIES
// should respond with a status code of 200
// should respond with a list of movies

app.get('/movies', (req, res) => {
  res.status(200).send();
})