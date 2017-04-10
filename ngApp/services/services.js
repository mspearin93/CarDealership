var myapp;
(function (myapp) {
    var Services;
    (function (Services) {
        var MovieService = (function () {
            function MovieService($resource) {
                this.MovieResource = $resource('/api/movies');
            }
            MovieService.prototype.listMovies = function () {
                return this.MovieResource.query();
            };
            return MovieService;
        }());
        Services.MovieService = MovieService;
        angular.module('myapp').service('movieService', MovieService);
        var MyService = (function () {
            function MyService() {
            }
            return MyService;
        }());
        Services.MyService = MyService;
        angular.module('myapp').service('myService', MyService);
    })(Services = myapp.Services || (myapp.Services = {}));
})(myapp || (myapp = {}));
