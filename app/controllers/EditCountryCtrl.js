function EditCountryCtrl($scope, $routeParams, CountryService, $location){	
    console.log($routeParams.countryName);
    console.log("Searching for..." + $routeParams.countryName);    

    CountryService.query({countryName:$routeParams.countryName}, function(response){
        $scope.countries = response;
    });

    
    $scope.submit= function(){
    	alert("Updating "+$routeParams.countryName+"...");
        CountryService.update({countryName:$routeParams.countryName},$scope.countries[0]);
        $location.path("/countries");
    }
        
};