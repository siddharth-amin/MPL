app.controller('jerseyStory',function($scope,$rootScope,$http){
    $scope.stories =[{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 1'},{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 2'},{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 3'},{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 4'},{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 5'},{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 6'}]
    /*if($rootScope.isAuthenticated){
        var data = {}
        $http.post("",data).then(function successCallback(response){
            $scope.stories = resp  onse.data;
            $scope.stories.array.forEach(element => {
                
            });
        },function errorCallback(response){
            
        })
    }
    else{
        $http.get("",data).then(function successCallback(response){
            
        },function errorCallback(response){

        })
    }*/
    
});

app.controller('userStoryMode', function($scope,$http){
    /*var data = {}
    $http.post("",data).then(function successCallback(response){
        
    },function errorCallback(response){
        
    })*/
});