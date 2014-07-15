function CountryDetailCtrl($scope, $http,$routeParams){
    $scope.view = {};
    console.log($routeParams.countryName);
    console.log("Searching for..." + $routeParams.countryName);
    $http.get('/countries/'+$routeParams.countryName).success(function(data){
        $scope.countries = data;
        console.log(data);
    })
        .error(function(data){
            console.log('Error: ' + data);
        });


};
