function AllCountryCtrl($http, $scope, $filter, ngTableParams){
    
    $http.get('/countries')
    .success(function(data){                       
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
        console.log('Error: '+ data);
    });  
    
};