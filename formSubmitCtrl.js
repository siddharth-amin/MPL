app.controller('formSubmitCtrl',function($scope){

    $scope.uploadStory = function() {
        $http.post("", data).then(function successCallback(response){
            //Get response from uploaded file 
        }, function errorCallback(response){
     
        }); 
        $http.post("", data).then(function successCallback(response){
            //Add to Database
        }, function errorCallback(response){
     
        });
    }
   $http.post("", data).then(function successCallback(response){
    
   }, function errorCallback(response){

   }); 
});