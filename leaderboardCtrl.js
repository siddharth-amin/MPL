app.controller('leaderboardCtrl',function($scope, $http){
    //$scope.leaderBoard = [{"name":"John Doe","score":378},{"name":"John Doe","score":355},{"name":"John Doe","score":304},{"name":"John Doe","score":244},{"name":"John Doe","score":178},{"name":"John Doe","score":144},{"name":"John Doe","score":94}];
    //$scope.podium = [{"name":"John Doe","score":748,"picture":'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',"position":'2nd'},{"name":"Kiran Keshav","score":517,"picture":'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',"position":'1st'},{"name":"Trina Gupta","score":401,"picture":'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',"position":'3rd'}];
    $scope.leaderBoard = [];
    $scope.podium = [];
    var config = {
        headers: {
            'Content-Type': "application/json",
            'APIKey' : 'MQ7h57ty767689f43caf4x5h43wu9csfc5617uh65e7d8w10jqpbb6qL'
        }
      };
    $http.get("https://c12xl1ybn0.execute-api.ap-south-1.amazonaws.com/Stage/ReferralsTrack/getleaderboard", config).then(function successCallback(response) {
        $scope.leaderBoard1 = response.data;
        $scope.leaderBoard1.forEach(element => {
          $scope.podium.push({name: element.UserName, picture : element.StoryImageURL, score: element.TotalCount});
          $scope.leaderBoard.push({name: element.UserName, score: element.TotalCount});
        });
        $scope.podium = JSON.parse(angular.toJson($scope.podium));
        console.log($scope.podium);
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