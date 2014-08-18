function SearchFormCtrl($scope, $filter, ngTableParams, CountrySearch, $location){
    
    $scope.data ={};

    $scope.submit = function(){
        console.log("Searching for..." + $scope.view.countryName);
        CountrySearch.query({countryName:$scope.view.countryName}, function(response){
        
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
        
    }

    $scope.reset = function(){
        console.log("resetting the countries listing...");
        $scope.view.countryName="";
        console.log($scope.tableParams.data);
        $data={};
        console.log($scope.tableParams.data);
        $data.reload();
        
        if(angular.equals({}, $scope.data)){
            console.log("cleared countries");
        }
        else{
            console.log("didn't clear the countries out correctly");
        }
    }

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
                $location.path('/countries');
            }
        });      
        
    }


};
