function AllCountryCtrl($scope, $filter, CountryService, ngTableParams){         
    $scope.data = {};
    
    CountryService.query(function(response){         
        console.log(response);
        $scope.tableParams = new ngTableParams({
            page:1,
            count:response.length/2,
            sorting:{
                countryName: 'asc'
            }
        },{
            total:response.length,
            getData: function($defer, params){
                var orderedData = params.sorting() ?
                            $filter('orderBy')(response, params.orderBy()) : response;
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));           
            }
        });

    });

    
     
};