app.controller('socialLoginCtrl', function($scope, $http, $rootScope) {

    /*var registerData = {firstName: $scope.registerFirstName, lastName: $scope.registerLastName, username: $scope.registerUserName, revisecode: $scope.registerCode, email: $scope.registerEmailId, ReferredBy: $rootScope.referredBy}
    $scope.registerUser = function (){
        $http.post("https://localhost:61199/Users/register",JSON.stringify(registerData)).then(function successCallback(response) {
        $rootScope.isAuthenticated = True;
    }, function errorCallback(response) {

    });
    }*/

    $scope.socialAuthenticate = function(provider) {
      $auth.authenticate(provider).then(function(response) {
        // Signed in with Provider.
        $rootScope.isAuthenticated = True;
      })
      .catch(function(response) {
        // Something went wrong.
        $rootScope.isAuthenticated = False;
      });
    };
});

app.controller('registerCtrl', function($scope, $http, $rootScope) {
    
    $scope.registerUser = function (){
        var registerData = {firstName: $scope.registerFirstName, lastName: $scope.registerLastName, username: $scope.registerUserName, revisecode: $scope.registerCode, email: $scope.registerEmailId, ReferredBy: $rootScope.referredBy}
        $rootScope.userName = $scope.firstName;
        $rootScope.isAuthenticated = true;
        $http.post("",JSON.stringify(registerData),{
            withCredentials: true,
            headers:{ 'APIKey': $rootScope.key}
        }).then(function successCallback(response) {
        $scope.emit('otpRequest',$scope.registerUserName)
        
    }, function errorCallback(response) {
        console.log(response)
    });
    }
});
app.controller('verifyCtrl', function($scope, $http, $rootScope) {

});

app.controller('storyCtrl', function($scope, $http, $rootScope) {

});

app.controller('otpController', function($scope,$http,$rootScope,$cookies){

    $scope.on('otpRequest',function(event,data){
        $scope.isRegistered = True;
    });

    $scope.validateAccount = function(){
        var validateData = {}
        $http.post("", JSON.stringify(validateData)).then(function successCallback(){

        },function errorCallback(){

        });
    }

});