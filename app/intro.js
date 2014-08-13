var intro = angular.module("intro",["ngRoute","ngTable","ngResource","ngBootbox"]);

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
    }).when("/countries/:countryName/edit",{
        templateUrl:"view/editCountry.html",
        controller:EditCountryCtrl
    }).otherwise({
        redirectTo:"/search"
    })
})

intro.factory('CountryService', function($resource){
    return $resource('/countries/:countryName', {}, {
        update: { method: 'PUT', params:{countryName:'@countryName'}}
    });
});

