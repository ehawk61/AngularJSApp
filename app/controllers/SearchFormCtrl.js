function SearchFormCtrl($scope, $http){
    $scope.view = {};

    $scope.submit = function(){
        console.log("Searching for..." + $scope.view.countryName);
        $http.get('/countries/'+$scope.view.countryName).success(function(data){
          $scope.countries = data;
          console.log(data);


        })
        .error(function(data){
          console.log('Error: ' + data);
        });
    }

    $scope.reset = function(){
        console.log("resetting the countries listing...");
        $scope.countries ={};

        if(angular.equals({}, $scope.countries)){
            console.log("cleared countries");
        }
        else{
            console.log("didn't clear the countries out correctly");
        }
    };

};
