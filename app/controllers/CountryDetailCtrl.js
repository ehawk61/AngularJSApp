function CountryDetailCtrl($scope,$routeParams, CountryService, $location){
    $scope.view = {};
    console.log($routeParams.countryName);
    console.log("Searching for..." + $routeParams.countryName);    

    CountryService.query({countryName:$routeParams.countryName}, function(response){
        $scope.countries = response;
    });
    
    $scope.delete = function(){
       
        bootbox.confirm("Are you sure you want to delete "+$routeParams.countryName+"?",function(response){
            if (response == true)
            {
                CountryService.delete({countryName:$routeParams.countryName});
                $location.path('/countries');
            }
        });
        
        
        
    };

    $scope.edit = function(){
        bootbox.confirm("Are you sure you want to edit "+$routeParams.countryName+"?", function(capture){
            if (capture == true)
            {            
                $location.path('/countries/'+$routeParams.countryName+"/edit");
            }     
        });
        
        
    }

};
