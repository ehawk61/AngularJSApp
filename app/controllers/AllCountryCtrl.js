function AllCountryCtrl($http, $scope){
    console.log();
    $http.get('/countries').success(function(data){
        $scope.countries = data;
        console.log(data);
    })
    .error(function(data){
        console.log('Error: '+ data);
    });
    
};