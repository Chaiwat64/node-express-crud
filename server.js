var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mydb'
});

var app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get("/", (req, res) => {
    res.send("Hello World");
})
app.get('/users', function (req, res, next) {
    console.log("get user");
    connection.query(
      'SELECT * FROM `user`',
      function(err, results, fields) {
        res.json(results);
      }
    );
  })


  app.get('/users/:id', function (req, res, next) {
    const id = req.params.id;
    connection.query(
      'SELECT * FROM `user` WHERE `id` = ?',
      [id],
      function(err, results) {
        res.json(results);
      }
    );
  })
  app.post('/users', function (req, res, next) {
    console.log("post users");
    console.log(req.body);
    connection.query(
      'INSERT INTO `user`(`fname`, `lname`, `username`, `password`, `avatar`) VALUES (?, ?, ?, ?, ?)',
      [req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar],
      function(err, results) {
        res.json(results);
      }
    );
  })
  app.put('/users', function (req, res, next) {
    connection.query(
      'UPDATE `user` SET `fname`= ?, `lname`= ?, `username`= ?, `password`= ?, `avatar`= ? WHERE id = ?',
      [req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar, req.body.id],
      function(err, results) {
        res.json(results);
      }
    );
  })
  
app.delete('/users', function (req, res, next) {
    connection.query(
      'DELETE FROM `user` WHERE id = ?',
      [req.body.id],
      function(err, results) {
        res.json(results);
      }
    );
  })

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})

