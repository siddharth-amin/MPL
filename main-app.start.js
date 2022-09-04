var app = angular.module('mainApp', ['satellizer','ngCookies'])
.config(function($authProvider) {

  $authProvider.facebook({
    clientId: 'Facebook App ID'
  });

  // Optional: For client-side use (Implicit Grant), set responseType to 'token' (default: 'code')
  $authProvider.facebook({
    clientId: 'Facebook App ID',
    responseType: 'token'
  });

  $authProvider.google({
    clientId: 'Google Client ID',
    responseType: 'token'
  });

});

app.controller('mainCtrl',function($rootScope,$scope){
    $rootScope.isAuthenticated = false;
    $rootScope.key = "MQ7h57ty767689f43caf4x5h43wu9csfc5617uh65e7d8w10jqpbb6qL";
    const urlParams = new URLSearchParams(window.location.search);
    
    const  referralCode = urlParams.get('refcode');
    $rootScope.referredBy = referralCode;
    $scope.userName = $rootScope.userName;
});