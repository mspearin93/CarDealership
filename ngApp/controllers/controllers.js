var myapp;
(function (myapp) {
    var Controllers;
    (function (Controllers) {
        var apiUrl = '/api/cars/search/';
        var DialogController = (function () {
            function DialogController($http, $mdDialog, car) {
                this.$http = $http;
                this.$mdDialog = $mdDialog;
                this.car = car;
            }
            DialogController.prototype.close = function () {
                this.$mdDialog.hide();
            };
            return DialogController;
        }());
        var HomeController = (function () {
            function HomeController($http, $mdDialog) {
                var _this = this;
                this.$http = $http;
                this.$mdDialog = $mdDialog;
                this.$http.get('/api/cars/')
                    .then(function (response) {
                    _this.cars = response.data;
                })
                    .catch(function (response) {
                    console.error('Could not retrieve cars.');
                });
                this.$http.get('/api/makes/')
                    .then(function (response) {
                    _this.makes = response.data;
                })
                    .catch(function (response) {
                    console.error('Could not retrieve cars.');
                });
            }
            HomeController.prototype.openDialog = function (car) {
                this.$mdDialog.show({
                    controller: DialogController,
                    controllerAs: 'dialog',
                    templateUrl: '/ngApp/views/dialog.html',
                    clickOutsideToClose: true,
                    locals: { car: car }
                });
            };
            HomeController.prototype.displayDetail = function (car) {
                console.log(car);
            };
            HomeController.prototype.fetch = function () {
                var _this = this;
                this.$http.get('/api/cars/search/' + this.search).then(function (res) {
                    console.log(res.data);
                    _this.cars = res.data;
                });
                this.search = "";
            };
            HomeController.prototype.fetchbyID = function () {
                var _this = this;
                var localMake = this.findMake(this.name);
                this.$http.get('/api/cars/searchID/' + localMake.id)
                    .then(function (response) {
                    _this.cars = response.data;
                })
                    .catch(function (response) {
                    console.error('Could not retrieve cars.');
                });
            };
            HomeController.prototype.findMake = function (name) {
                var matches = this.makes.filter(function (make) {
                    return make.name == name;
                });
                return matches.length ? matches[0] : null;
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        angular.module('myapp').controller('homeController', HomeController);
        var AboutController = (function () {
            function AboutController() {
                this.message = 'Hello from the about page!';
            }
            return AboutController;
        }());
        Controllers.AboutController = AboutController;
    })(Controllers = myapp.Controllers || (myapp.Controllers = {}));
})(myapp || (myapp = {}));
