function AddCountryCtrl($scope, $routeParams, CountryAdd, $location){	
    $scope.country={}     
    
    $scope.createCountry= function(){
    	bootbox.alert("Adding country...");
	console.log($scope.country);
	CountryAdd.add($scope.country);
        $location.path('/countries');
    }
    
        
};