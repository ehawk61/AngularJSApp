function SearchFormCtrl($scope, $http, $filter, ngTableParams){
    $scope.view = {};

    $scope.submit = function(){
        console.log("Searching for..." + $scope.view.countryName);
        $http.get('/countries/'+$scope.view.countryName)
        .success(function(data){
        
        
        console.log(temp);
        $scope.tableParams = new ngTableParams({
                page:1,
                count:data.length/2,                
                sorting: {
                    countryName: 'asc'
                }
                
            },{
                total: data.length,
                getData: function($defer, params){
                    var orderedData = params.sorting() ?
                                $filter('orderBy')(data, params.orderBy()) :
                                data;
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }        
            });        


        })
        .error(function(data){
          console.log('Error: ' + data);
        });
    }

    $scope.reset = function(){
        console.log("resetting the countries listing...");
        $scope.view.countryName="";
        
        if(angular.equals({}, $scope.countries)){
            console.log("cleared countries");
        }
        else{
            console.log("didn't clear the countries out correctly");
        }
    };

};
