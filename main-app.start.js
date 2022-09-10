var app = angular.module('mainapp', ['satellizer','ngCookies'])
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

app.controller('mainCtrl',function($rootScope,$scope, $http){
    $scope.isAuthenticated = false;
    $scope.storyUploaded = false;
    $rootScope.key = "MQ7h57ty767689f43caf4x5h43wu9csfc5617uh65e7d8w10jqpbb6qL";
    const urlParams = new URLSearchParams(window.location.search);
    var configsa = {
      headers: {
          'Content-Type': "application/json",
          'APIKey' : 'MQ7h57ty767689f43caf4x5h43wu9csfc5617uh65e7d8w10jqpbb6qL'
      }
    };
    const referralCode = urlParams.get('refcode');
    console.log(referralCode);
    $rootScope.referredBy = referralCode;
    //$scope.userName = "Test";
    $scope.user = {hasuploaded: false};
    $scope.storyUploaded = false;
    // $scope.user = {firstName:"Kiran",lastName:"Keshav",profilepic:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',email:'kiran@thinktreemedia.in',reviseCode:'thinktree',userName:'kirankeshav',position:'143',storyShares:'2',message:'',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',referralCode:'Ax45ry',hasuploaded:false}
    // $scope.userStory = {name:'Kiran Keshav',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',profilepic:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 1'}
    // $scope.stories =[{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',profilepic:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 1'},{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',profilepic:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 2'},{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',profilepic:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 3'},{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',profilepic:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 4'},{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',profilepic:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 5'},{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',profilepic:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 6'}]
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

    $scope.authenticate = function(){
      var data = {
        email: $scope.loginuserName,
        password: $scope.loginpassword
      };
      var config = {
        headers: {
            'Content-Type': "application/json",
            'APIKey' : 'MQ7h57ty767689f43caf4x5h43wu9csfc5617uh65e7d8w10jqpbb6qL'
        }
      };
      
      $http.post('https://c12xl1ybn0.execute-api.ap-south-1.amazonaws.com/Stage/Users/authenticatev2', JSON.stringify(data), config).then(function (response) 
      {
        if (response.data)
            console.log(response);
            $scope.isAuthenticated = true;
           // $scope.storyUploaded = true;
           
            $scope.user = {firstName: response.data.FirstName, hasuploaded : false, Email: response.data.Email, lastName: response.data.LastName, Id: response.data.Id};
            let id = response.data.Id;
            console.log(id);
            var configs = {
              headers: {
                  'Content-Type': "application/json",
                  'Authorization' : `Bearer ${response.data.JwtToken}`
              }
            };
            // console.log(configs);
            if(id != null){
            var url = "https://c12xl1ybn0.execute-api.ap-south-1.amazonaws.com/Stage/UserStories/getuserstoriesv2";
            $http.get(url+'?id='+id, config).then(function (response) 
            {
              if (response.data.story == null)
                $scope.storyUploaded = false;
                $("#uploadFormPopup").fadeIn();
              }, function (response) {
                  $scope.msg = "Error in registration";
                  $scope.statusval = response.status;
                  $scope.statustext = response.statusText;
                  // $scope.headers = response.headers();
            });
            }else{
              $('#signInPopup').fadeOut();
            }
            //thirdAnimation();
            $('#signInPopup').fadeOut();
        }, function (response) {
            $scope.msg = "Error in registration";
            $scope.statusval = response.status;
            $scope.statustext = response.statusText;
            // $scope.headers = response.headers();
      });

      //var dAES = $crypto.decrypt(eAES);
    }

    let imageUpload = document.getElementById("file");
    var base64String = "";
    const reader = new FileReader();
    imageUpload.addEventListener('change', (e) => {
        // Get a reference to the file
        const file = e.target.files[0];

        // Encode the file using the FileReader API
     
        reader.onloadend = () => {
            // Use a regex to remove data url part
          base64String = reader.result
                .replace('data:', '')
                .replace(/^.+,/, '');
            //console.log(base64String);
            // Logs wL2dvYWwgbW9yZ...
        };
        reader.readAsDataURL(file);
    });

   
    $scope.uploadStory = function(storyCtrl){
      console.log(storyCtrl);
      var fd = new FormData();
      var files = document.getElementById('file').files[0];
      fd.append('file',files);
      var data = {
        "base64": base64String,
        "prefix": "Stories",
        "fileKey": files.name
      };
      var config = {
        headers: {
            'Content-Type': "application/json",
            'APIkey' : 'MQ7h57ty767689f43caf4x5h43wu9csfc5617uh65e7d8w10jqpbb6qL'
        }
      };
      $http.post('https://c12xl1ybn0.execute-api.ap-south-1.amazonaws.com/Stage/Files/uploadv2', JSON.stringify(data), config).then(function (response) 
      {
        if (response.data)
            //console.log(response.data);
            var datas = {}
            if(referralCode == null){
              var datas =  {
                "email": storyCtrl.email,
                "contactNumber": storyCtrl.contactNumber,
                "message": storyCtrl.message,
                "userProfileURL": response.data,
                "storyImageURL": response.data,
                "firstName": storyCtrl.firstName,
                "lastName":storyCtrl.lastName,
                "userName": storyCtrl.firstName
              }
            }else{
              var datas =  {
                "email": storyCtrl.email,
                "contactNumber": storyCtrl.contactNumber,
                "message": storyCtrl.message,
                "userProfileURL": response.data,
                "storyImageURL": response.data,
                "firstName" : storyCtrl.firstName,
                "lastName" : storyCtrl.lastName,
                "userName": storyCtrl.firstName,
                "ReferredBy" : referralCode
              }
            }
            $("#uploadFormPopup").fadeOut();
            console.log(datas);
            var url = "https://c12xl1ybn0.execute-api.ap-south-1.amazonaws.com/Stage/UserStories/storyflow";
            $http.post(url, JSON.stringify(datas), config).then(function (response) 
            {
              console.log(response.data);
              if (response.data == null)
                $scope.storyUploaded = true;
                $scope.userStory  = response.data;
                setTimeout(function() {
                  $('[data-toggle="popover"]').popover({
                      trigger: 'focus',
                      container: 'body',
                      html: true,
                      sanitize: false,
                      content: function() {
                          return $(this).attr("data-content");
                        }
                })}, 100);
                $("#uploadFormPopup").fadeOut();
                $("#certificatebutton").attr("href", response.data.CertURL);
                let url = "https://www.facebook.com/sharer/sharer.php";
                let twitterUrl = "http://twitter.com/share";
                let whatsappUrl = "https://web.whatsapp.com/send?text=www.google.com";
                $("#facebookShare").attr("href", url+'?u='+response.data.CertURL);
                $("#twitterShare").attr("href", twitterUrl+'?url='+response.data.CertURL);
                $("#whatsShare").attr("href", whatsappUrl+'?text='+response.data.CertURL);      
                $("#facebookShares").attr("href", url+'?u='+response.data.CertURL);
                $("#twitterShares").attr("href", twitterUrl+'?url='+response.data.CertURL);
                $("#whatsShares").attr("href", whatsappUrl+'?text='+response.data.CertURL);
                var documentUrl = response.data.CertURL;
                $("#certificateURl").attr("src", documentUrl)
              }, function (response) {
                  console.log(response);
            });
        }, function (response) {
            console.log(response);
      });
    }
    $scope.register = function (registerCtrl) {
      var data= {
        firstName: registerCtrl.registerFirstName,
        lastName: registerCtrl.registerLastName,
        email: registerCtrl.registerEmail,
        contactNumber: registerCtrl.registerNumber,
        userName : registerCtrl.registerUserName,
        reviseCode: registerCtrl.registerCode,
      };
      //62wFK3RTSt4LsGHYEPOCtw==
      //var payload = $crypto.encrypt(JSON.stringify(data));
      //debugger;
      //console.log(payload);
     // let aes = $crypto.decrypt(payload);
      // aes = JSON.parse(aes);
      // aes.password = $crypto.decrypt('a3lKUrXkUsBwZ/7tiOdecQ==', 'ps098765432101267834590157493000');
      // console.log($crypto.decrypt('kyJRRpg^q', 'ps098765432101267834590157493000'));
      var config = {
        headers: {
            'Content-Type': "application/json",
            'APIKey' : 'MQ7h57ty767689f43caf4x5h43wu9csfc5617uh65e7d8w10jqpbb6qL'
        }
      };
     // var payload = $crypto.encrypt(data);
      // var payloads = {
      //   "payload" : payload
      // };
      // console.log(JSON.stringify(payloads));
      // $http.headers.APIKey = "MQ7h57ty767689f43caf4x5h43wu9csfc5617uh65e7d8w10jqpbb6qL";
      $http.post('https://c12xl1ybn0.execute-api.ap-south-1.amazonaws.com/Stage/Users/registerv2', JSON.stringify(data), config).then(function (response) 
      {
        if (response.data)
          $('#signinRegisterPopup').fadeOut();
          $('#verifyEmailPopup').fadeIn();
        }, function (response) {
            $scope.msg = "Error in registration";
            $scope.statusval = response.status;
            $scope.statustext = response.statusText;
            // $scope.headers = response.headers();
      });
    };

    $scope.verifyEmail = function (verifyCtrl) {
      var data= {
        token: verifyCtrl.token,
      }
      var config = {
        headers: {
            'Content-Type': "application/json",
            'APIKey' : 'MQ7h57ty767689f43caf4x5h43wu9csfc5617uh65e7d8w10jqpbb6qL'
        }
      };
      $http.post('https://c12xl1ybn0.execute-api.ap-south-1.amazonaws.com/Stage/Users/verify-emailv2', JSON.stringify(data), config).then(function (response) 
      {
        if (response.data)
           $('#verifyEmailPopup').fadeOut();
           $("#successPopup").fadeIn();
           setTimeout(function() {$("#successPopup").fadeOut();}, 2000);
        }, function (response) {
            $scope.msg = "Error in registration";
            $scope.statusval = response.status;
            $scope.statustext = response.statusText;
            // $scope.headers = response.headers();
      });
    };
    $scope.checkForUploadForm = function(){
      // if($scope.isAuthenticated){
        openUploadForm();
     // }
      //else{
       // openSignIn();
      //}
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