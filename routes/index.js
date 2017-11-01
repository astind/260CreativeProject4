const express = require('express');
const fs = require('fs');
const http = require('http');
const router = express.Router();


var movies = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('movies.html', { root: 'public' });
});

router.post('/movies', function(req, res) {
  console.log("update movies");
  movies = req.body;
  res.end('{"success" : "Updated Successfully", "status" : 200}');
});

router.get('/movies', function(req, res) {
  console.log("GET movies");
  res.send(movies);
});

router.get('/getmovies', function(req, res) {
  console.log("In getMovies");
  var api = 'http://www.theimdbapi.org/api/find/movie?title=';
  var name = req.query.m.toLowerCase();
  var year = req.query.y;
  api += name;
  api += '&year=';
  api += year;
  http.get(api, function(response) {
    var body = '';
    response.setEncoding('utf8');
    response.on('data', function(data) {
      body += data;
    });
    response.on('end', function() {
      if(body == 'null' || body == '[]'){
        console.log("invalid movie");
      } else {
      var json = JSON.parse(body);
      movies.push({
        poster: json[0].poster.thumb,
        title: json[0].title,
        year: json[0].year,
        votes: 0
      });
      }
      res.status(200).json(movies);
    });
  }).on('error', function(e) {
    console.error(e);
  });
});


module.exports = router;
