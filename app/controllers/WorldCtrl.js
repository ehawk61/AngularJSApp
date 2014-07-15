var WorldCtrl = function ($scope){
    $scope.population = 10000;
    $scope.countries = [
        {name: 'United States', population : 63.1},
        {name: 'United Kingdom', population : 61.8},
    ]
    $scope.worldsPercentage = function (countryPopulation){
        return (countryPopulation / $scope.population)* 100;
    }
}
