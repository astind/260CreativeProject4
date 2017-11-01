

var app = window.angular.module('app', [])
  app.controller('movieCtrl', movieCtrl)



function movieCtrl ($scope, $http) {

  $scope.movies = [];

  var getMovies = '/movies'
  $http.get(getMovies).success(function (response) {
     $scope.movies = response;
  }).error(function() {
      console.log("cant get movies");
  });
  

  $scope.addNew = function (movie) {
    var movieUrl = '/getmovies';
    $http.get(movieUrl + '?m='+movie.title+'&y='+movie.year).success(function (response) {
      $scope.movies = response;
    }).error(function() {
	console.log("Get error");
    });    

    movie.title = '';
    movie.year = '';
  };

  $scope.upVote = function (movie) {
      movie.votes += 1;
      $http({
	url: getMovies,
	method: "POST",
	data: $scope.movies
      }).success(function(data, status, headers, config) {
	console.log("Post worked");
      }).error(function(data, status, headers, config) {
	console.log("post failed");
      });
  };

  $scope.downVote = function (movie) {
      movie.votes -= 1;
      $http({
        url: getMovies,
        method: "POST",
        data: $scope.movies
      }).success(function(data, status, headers, config) {
        console.log("Post worked");
      }).error(function(data, status, headers, config) {
        console.log("post failed");
      });
  };

}

