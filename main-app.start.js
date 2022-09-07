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
    $scope.isAuthenticated = false;
    $scope.storyUploaded = false;
    $rootScope.key = "MQ7h57ty767689f43caf4x5h43wu9csfc5617uh65e7d8w10jqpbb6qL";
    const urlParams = new URLSearchParams(window.location.search);
    
    const  referralCode = urlParams.get('refcode');
    $rootScope.referredBy = referralCode;
    $scope.userName = "Test";
    $scope.user = {firstName:"Kiran",lastName:"Keshav",profilepic:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',email:'kiran@thinktreemedia.in',reviseCode:'thinktree',userName:'kirankeshav',position:'143',storyShares:'2',message:'',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',referralCode:'Ax45ry',hasuploaded:false}
    $scope.userStory = {name:'Kiran Keshav',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',profilepic:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 1'}
    $scope.stories =[{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',profilepic:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 1'},{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',profilepic:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 2'},{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',profilepic:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 3'},{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',profilepic:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 4'},{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',profilepic:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 5'},{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',profilepic:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 6'}]
    $scope.authenticate = function(){
      if($scope.loginuserName == $scope.user.userName && $scope.loginpassword == $scope.user.reviseCode){
        $scope.isAuthenticated = true;
        if($scope.user.hasuploaded){ 
          $scope.storyUploaded = true;
          thirdAnimation();
        }
        $('#signInPopup').fadeOut();
      }
    }

    $scope.checkForUploadForm = function(){
      if($scope.isAuthenticated){
        openUploadForm();
      }
      else{
        openSignIn();
      }
    }
    $scope.storyUp = function(){
      $scope.storyUploaded = true;
      $scope.user.hasuploaded = true;
      secondToThirdAnim();
    }
    $scope.firstToSecondAnim = function(){
      firstOut();
      secondAnimation();
    }
    $scope.firstToThirdAnim = function(){
      firstOut();
      thirdAnimation();
    }
    $scope.secondToThirdAnim = function(){
      secondOut();
      thirdAnimation();
    }
    $scope.trycopyToClipboard = function(){
      copyToClipboard();
    }
});