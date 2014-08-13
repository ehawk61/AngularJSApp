function CountryDetailCtrl($scope,$routeParams, CountryService, $location){
    $scope.view = {};
    console.log($routeParams.countryName);
    console.log("Searching for..." + $routeParams.countryName);    

    CountryService.query({countryName:$routeParams.countryName}, function(response){
        $scope.countries = response;
    });
    
    $scope.delete = function(){
        var capture = confirm("Are you sure you want to delete "+$routeParams.countryName+"?");
        if (capture == true)
        {
            CountryService.delete({countryName:$routeParams.countryName});
            $location.path('/countries');
        }
        
    };

    $scope.edit = function(){
        var capture = confirm("Are you sure you want to edit "+$routeParams.countryName+"?");
        if (capture == true)
        {            
            $location.path('/countries/'+$routeParams.countryName+"/edit");
        }
    }

};
