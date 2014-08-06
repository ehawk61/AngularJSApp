var intro = angular.module("intro",["ngRoute","ngTable","ngResource"]);

intro.config(function($routeProvider){
    $routeProvider.when("/search",{
        templateUrl:"view/search.html",
        controller:SearchFormCtrl
    }).when("/countries",{
        templateUrl:"view/countries.html",
        controller:AllCountryCtrl
    }).when("/countries/:countryName/",{
        templateUrl:"view/country.html",
        controller:CountryDetailCtrl
    }).otherwise({
        redirectTo:"/search"
    })
})

intro.factory('CountryService', function($resource){
    return $resource('/countries/:countryName',{})
});

