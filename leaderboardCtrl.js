app.controller('leaderboardCtrl',function($scope, $http){
    $scope.leaderBoard = [{"name":"John Doe","score":378},{"name":"John Doe","score":355},{"name":"John Doe","score":304},{"name":"John Doe","score":244},{"name":"John Doe","score":178},{"name":"John Doe","score":144},{"name":"John Doe","score":94}];
    $scope.podium = [{"name":"John Doe","score":459,"picture":'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',"position":'2nd'},{"name":"Kiran Keshav","score":748,"picture":'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',"position":'1st'},{"name":"Trina Gupta","score":401,"picture":'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',"position":'3rd'}];
    $scope.getleaderList = function(){
        if($rootScope.isAuthenticated){
            var data = {id: $rootScope.userId}
            $http.post("", JSON.stringify(data)).then(function successCallback(response) {
                $scope.leaderBoard = response.data;
                $scope.podium = response.data;
                $scope.userPosition = response.data;
                console.log(response.data)
            }, function errorCallback(response) {
                console.log(response.data)    
            })
        }
        else{
            console.log("Not logged in")
        }
        
    }
    
    
    /*$http.get("leaderboard.php").then(function success(response){
        //$scope.leaderBoard = response.data.leaderboard;
    }, function error(response){

    });*/
});