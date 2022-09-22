app.controller('leaderboardCtrl',function($scope, $http){
    $scope.leaderBoard = [];
    $scope.podium = [];
    var config = {
        headers: {
            'Content-Type': "application/json",
            'APIKey' : 'MCBC7h57ty767689f43caf4x5h43wu9csfc5617uh65e7d8w10jqpbbMMLE'
        }
      };
    $http.get("https://c12xl1ybn0.execute-api.ap-south-1.amazonaws.com/Stage/ReferralsTrack/getleaderboard", config).then(function successCallback(response) {
        $scope.leaderBoard1 = response.data;
        $scope.leaderBoard1.forEach((element, i) => {
            if (i<3) {          
                $scope.podium.push({name: element.UserName, picture : element.StoryImageURL, score: element.TotalCount});
            } else {
                $scope.leaderBoard.push({name: element.UserName, score: element.TotalCount});
            }
          });
        $scope.podium = JSON.parse(angular.toJson($scope.podium));
        $scope.leaderBoard = JSON.parse(angular.toJson($scope.leaderBoard));
        $scope.userPosition = response.data;
    }, function errorCallback(response) {
        console.log(response.data)    
    });  
    /*$http.get("leaderboard.php").then(function success(response){
        //$scope.leaderBoard = response.data.leaderboard;
    }, function error(response){

    });*/
});