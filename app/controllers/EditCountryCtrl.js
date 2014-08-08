function EditCountryCtrl($scope,$routeParams, CountryService, $location){
	$scope.view = {};
    console.log($routeParams.countryName);
    console.log("Searching for..." + $routeParams.countryName);    

    CountryService.query({countryName:$routeParams.countryName}, function(response){
        $scope.countries = response;
    });

    
};