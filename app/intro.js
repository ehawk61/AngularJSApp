var intro = angular.module("intro",["ngRoute","ngTable"]);

intro.config(function($routeProvider){
    $routeProvider.when("/population", {
        templateUrl:"view/population.html",
        controller: WorldCtrl
    }).when("/search",{
        templateUrl:"view/search.html",
        controller:SearchFormCtrl
    }).when("/countries",{
        templateUrl:"view/countries.html",
        controller:AllCountryCtrl
    }).when("/countries/:countryName/details",{
        templateUrl:"view/country.html",
        controller:CountryDetailCtrl
    }).otherwise({
        redirectTo:"/search"
    })

});