function AllCountryCtrl($scope, $filter, CountryService, ngTableParams, $location, $route){         
    $scope.data = {};
    
    CountryService.query(function(response){         
        console.log(response);
        $scope.tableParams = new ngTableParams({
            page:1,
            count:response.length,
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

    $scope.edit = function(countryName) {
        bootbox.confirm("Are you sure you want to edit "+countryName+"?", function(capture){
            if (capture == true)
            {            
                $location.path('/countries/'+countryName+'/edit');
            }    
        });
    }

    $scope.delete = function(countryName){
       
        bootbox.confirm("Are you sure you want to delete "+countryName+"?",function(response){
            if (response == true)
            {
                CountryService.delete({countryName:countryName});
                bootbox.alert("Deleted "+countryName);
                $route.reload();
            }
        });         
        
    }
     
};