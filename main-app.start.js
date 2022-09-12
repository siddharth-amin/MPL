var app = angular.module('mainapp', ['satellizer','ngCookies'])
.config(function($authProvider) {

  $authProvider.facebook({
    clientId: 'Facebook App ID'
  });

  $.LoadingOverlaySetup({
    background      : "rgba(0, 0, 0, 0.5)",
    imageColor      : "#297BBE"
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
            $scope.isAuthenticated = true;
           // $scope.storyUploaded = true;
           
            $scope.user = {firstName: response.data.FirstName, hasuploaded : false, Email: response.data.Email, lastName: response.data.LastName, Id: response.data.Id};
            let id = response.data.Id;
            var configs = {
              headers: {
                  'Content-Type': "application/json",
                  'Authorization' : `Bearer ${response.data.JwtToken}`
              }
            };
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
        };
        reader.readAsDataURL(file);
    });

   
    $scope.uploadStory = function(storyCtrl){
      if(storyCtrl.firstName && storyCtrl.email && storyCtrl.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) && storyCtrl.message){
        var fd = new FormData();
        var files = document.getElementById('file').files[0];
        fd.append('file',files);
        var data = {};
        if(files == null) {
          data = { "base64": ""};
        }else{
          data = {
            "base64": base64String,
            "prefix": "Stories",
            "fileKey": files.name
          };
        }
        var config = {
          headers: {
              'Content-Type': "application/json",
              'APIkey' : 'MQ7h57ty767689f43caf4x5h43wu9csfc5617uh65e7d8w10jqpbb6qL'
          }
        };
        if(data.base64 == null){
          $http.post('https://c12xl1ybn0.execute-api.ap-south-1.amazonaws.com/Stage/Files/uploadv2', JSON.stringify(data), config).then(function (response) 
          {
            if (response.data)
                $.LoadingOverlay("show");
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
                var url = "https://c12xl1ybn0.execute-api.ap-south-1.amazonaws.com/Stage/UserStories/storyflow";
                $http.post(url, JSON.stringify(datas), config).then(function (response) 
                {
                  if (response.data != null)
                    $.LoadingOverlay("hide");
                    $scope.storyUploaded = true;
                    $scope.userStory  = response.data;
                    $('#user-story').fadeIn();
                    setTimeout(function() {
                      $('.Hotspot').on('click',(e)=>{
                        $('.sp-profilepic').attr('src','' + $(e.currentTarget).data('profilepic') + '') ;
                        $('.sp-storyimg').attr('src','' + $(e.currentTarget).data('story') + '') ;
                        $('.sp-name').text($(e.currentTarget).data('name'));
                        $('.sp-message').text($(e.currentTarget).data('message'));
                        openStoryPopup();
                        
                      });}, 100);
                    $("#uploadFormPopup").fadeOut();
                    var documentUrl = response.data.CertURL;
                    $("#certificateURl").attr("src", documentUrl)
                    openCertificateImage();
                    $("#certificatebutton").attr("href", response.data.CertURL);
                    let url = "https://www.facebook.com/sharer/sharer.php";
                    let twitterUrl = "http://twitter.com/share";
                    let whatsappUrl = "https://web.whatsapp.com/send";
                    let referralCode = response.data.UserReferralCode;
                    let postUrl= "https://harfankijersey.mplsports.in/";
                    if(referralCode == null){
                     postUrl;
                    }else{
                      postUrl = "https://harfankijersey.mplsports.in/?refcode="+referralCode;
                    }
                    let postTitle = "Hey! I just got this certificate after sharing my story on #HarFanKiJersey. Help team India get their new T20 World Cup jersey and win exciting prizes. Click here: " +postUrl;
                    // let postImg = encodeURI(pinterestImg.src);
                    $("#whatsShare").attr("href", whatsappUrl+'?text='+postTitle );
                    $("#facebookShare").attr("href", url+'?u='+response.data.CertURL);
                    $("#twitterShare").attr("href", twitterUrl+'?text='+postTitle);    
                    $("#facebookShares").attr("href", url+'?u='+response.data.CertURL);
                    $("#twitterShares").attr("href", twitterUrl+'?text='+postTitle);
                    $("#whatsShares").attr("href", whatsappUrl+'?text='+postTitle );
                  }, function (response) {
                      console.log(response);
                });
            }, function (response) {
                console.log(response);
          });
        }else{
          $.LoadingOverlay("show");
          var datas = {}
          if(referralCode == null){
            var datas =  {
              "email": storyCtrl.email,
              "contactNumber": storyCtrl.contactNumber,
              "message": storyCtrl.message,
              "userProfileURL": "",
              "storyImageURL": "",
              "firstName": storyCtrl.firstName,
              "lastName":storyCtrl.lastName,
              "userName": storyCtrl.firstName
            }
          }else{
            var datas =  {
              "email": storyCtrl.email,
              "contactNumber": storyCtrl.contactNumber,
              "message": storyCtrl.message,
              "userProfileURL": "",
              "storyImageURL": "",
              "firstName" : storyCtrl.firstName,
              "lastName" : storyCtrl.lastName,
              "userName": storyCtrl.firstName,
              "ReferredBy" : referralCode
            }
          }
          $("#uploadFormPopup").fadeOut();
          var url = "https://c12xl1ybn0.execute-api.ap-south-1.amazonaws.com/Stage/UserStories/storyflow";
          $http.post(url, JSON.stringify(datas), config).then(function (response) 
          {
            if (response.data != null)
              $.LoadingOverlay("hide");
              $scope.storyUploaded = true;
              $('#user-story').fadeIn();
              $scope.userStory  = response.data;
              setTimeout(function() {
                $('.Hotspot').on('click',(e)=>{
                  $('.sp-profilepic').attr('src','' + $(e.currentTarget).data('profilepic') + '') ;
                  $('.sp-storyimg').attr('src','' + $(e.currentTarget).data('story') + '') ;
                  $('.sp-name').text($(e.currentTarget).data('name'));
                  $('.sp-message').text($(e.currentTarget).data('message'));
                  openStoryPopup();
  
                });}, 100);
              $("#uploadFormPopup").fadeOut();
              var documentUrl = response.data.CertURL;
              $("#certificateURl").attr("src", documentUrl)
              openCertificateImage();
              $("#certificatebutton").attr("href", response.data.CertURL);
              let url = "https://www.facebook.com/sharer/sharer.php";
              let twitterUrl = "http://twitter.com/share";
              let whatsappUrl = "https://web.whatsapp.com/send";
              let referralCode = response.data.UserReferralCode;
              let postUrl= "https://harfankijersey.mplsports.in/";
              if(referralCode == null){
               postUrl;
              }else{
                postUrl = "https://harfankijersey.mplsports.in/?refcode="+referralCode;
              }
              let postTitle = "Hey! I just got this certificate after sharing my story on Har Fan Ki Jersey. Help team India get their new T20 World Cup jersey and win exciting prizes. Click here: " +postUrl;
              // let postImg = encodeURI(pinterestImg.src);
              $("#whatsShare").attr("href", whatsappUrl+'?text='+postTitle );
              $("#facebookShare").attr("href", url+'?u='+response.data.CertURL);
              $("#twitterShare").attr("href", twitterUrl+'?text='+postTitle);    
              $("#facebookShares").attr("href", url+'?u='+response.data.CertURL);
              $("#twitterShares").attr("href", twitterUrl+'?text='+postTitle);
              $("#whatsShares").attr("href", whatsappUrl+'?text='+postTitle );
            }, function (response) {
                console.log(response);
          });
        }
      }
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

    $scope.openFbPopUp = function(){
      //var fburl = "http://www.facebook.com/sharer.php?s=100&p[title]=WEB1CHANNEL&p[summary]=Web+Design+Company+in+Dubai.&p[url]=http://www.webchannel.ae&p[images][0]=http://qacode.com/test.jpg']asdfa[/a]";
      var fburl = 'https://mplcert.s3.ap-south-1.amazonaws.com/P889.jpg';
      var fbimgurl = 'https://ahrefs.com/blog/wp-content/uploads/2019/12/fb-how-to-become-an-seo-expert.png';
      var fbtitle = 'Hey, I m a SuperFan';
      var fbsummary = "Hey! I just got this certificate after sharing my story on #HarFanKiJersey. Help team India get their new T20 World Cup jersey and win exciting prizes. Click here: (ReferralsURL)";
      var sharerURL = "http://www.facebook.com/sharer/sharer.php?s=100&p[url]=" + encodeURI(fburl);
     // var sharerURL = fburl
      window.open(
        sharerURL,
        'facebook-share-dialog', 
        'width=626,height=436'); 
      return  false;
  }

});