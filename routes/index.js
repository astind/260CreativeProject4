const express = require('express');
const fs = require('fs');
const http = require('http');
const router = express.Router();


var movies = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('movies.html', { root: 'public' });
});

router.get('/movies', function(req, res) {
  console.log("GET movies");
  res.json(movies);
});

router.post('/movies', function(req, res) {
  console.log("POST movies");
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
      var json = JSON.parse(body);
      movies.push({
        poster: json[0].poster.thumb,
        title: json[0].title,
        year: json[0].year,
        votes: 0
      });
      console.log(movies);
    });
  }).on('error', function(e) {
    console.error(e);
  });
  console.log('post done');
});


module.exports = router;
