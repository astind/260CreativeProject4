

angular.module('app', [])
  .controller('movieCtrl', movieCtrl)
  .factory('movieFetcher', movieFetcher);

function movieFetcher($http) {
  console.log("started fetch");
  var root = 'movies';
  return {
    get: function() {
      return $http
        .get(root)
        .then(function (resp) {
	  return resp.data;
        })
    }
  }
}


function movieCtrl ($scope, $http, movieFetcher) {

  $scope.movies = [];

  $scope.addNew = function (movie) {
    var movieUrl = 'movies';
    $http({
	url: movieUrl+'?m='+movie.title+'&y='+movie.year,
	method: "POST"
    }).success(function(data, status, headers, config) {
      console.log("post worked");
      movieFetcher.get()
      .then(function (data) {
        $scope.movies = data;
      })
    }).error(function(data ,status, headers, config) {
      console.log("Post failed");
    });
    
    movie.title = '';
    movie.year = '';

  };

  $scope.upVote = function (movie) {
      movie.votes += 1;
  };

  $scope.downVote = function (movie) {
      movie.votes -= 1;
  };

}

