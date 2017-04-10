namespace myapp.Controllers {

    const apiUrl = '/api/cars/search/';

    class DialogController {
        public close() {
          this.$mdDialog.hide();
        }

        constructor(private $http: ng.IHttpService, private $mdDialog: angular.material.IDialogService, public car: string) {
          //shortDescription = HomeController.cars;
        }
      }

    export class HomeController {
      public cars;
      public search;
      public makes;
      public name;

      public openDialog(car: string) {
            this.$mdDialog.show({
              controller: DialogController,
              controllerAs: 'dialog',
              templateUrl: '/ngApp/views/dialog.html',
              clickOutsideToClose: true,
              locals: { car: car }
            })
          }

      public displayDetail(car) {
         console.log(car);
      }

      public fetch() {
        this.$http.get('/api/cars/search/' + this.search).then((res) => {
          console.log(res.data);
          this.cars = res.data;
        })
        this.search = ""; // reset search
      }

      public fetchbyID() {
        let localMake = this.findMake(this.name);
        this.$http.get('/api/cars/searchID/' + localMake.id)
            .then((response) => {
                this.cars = response.data;
            })
            .catch((response) => {
                console.error('Could not retrieve cars.');
            });
      }

      public findMake(name:string) {
        let matches = this.makes.filter((make) => {
          return make.name == name;
        });
        return matches.length ? matches[0] : null;
      }

      constructor(private $http: ng.IHttpService, private $mdDialog: angular.material.IDialogService) {
          this.$http.get('/api/cars/')
              .then((response) => {
                  this.cars = response.data;
              })
              .catch((response) => {
                  console.error('Could not retrieve cars.');
              });

              this.$http.get('/api/makes/')
              .then((response) => {
                  this.makes = response.data;
              })
              .catch((response) => {
                  console.error('Could not retrieve cars.');
              });
      }

    }

    angular.module('myapp').controller('homeController', HomeController);

    export class AboutController {
        public message = 'Hello from the about page!';
    }

}
