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
      var compressor = new Compressor(e.target.files[0], {
        size: 4, // the max size in MB, defaults to 2MB
        quality: .75, // the quality of the image, max is 1,
        maxWidth: 320, // the max width of the output image, defaults to 1920px
        maxHeight: 400, // the max height of the output image, defaults to 1920px
        resize: true, // defaults to true, set false if you do not want to resize the image width and height
        rotate: false, // See the rotation section below
        success(data) {
          reader.onloadend = () => {
            base64String = reader.result
                  .replace('data:', '')
                  .replace(/^.+,/, '');
          };
          reader.readAsDataURL(data);
        }
      });
  });

   
    $scope.uploadStory = function(storyCtrl){

      if(storyCtrl.firstName && storyCtrl.email && storyCtrl.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) && storyCtrl.message){
        $.LoadingOverlay("show");
        var fd = new FormData();
        var files = document.getElementById('file').files[0];
        fd.append('file',files);
        var data = {};
        if(files == null) {
          data = { "base64": ""};
        }else{
          console.log(data);
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
        if(data.base64 != null){
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
                  $.LoadingOverlay("hide");
                  if (response.data != null)
                    $.LoadingOverlay("hide");
                    $scope.storyUploaded = true;
                    $scope.userStory  = response.data;
                    $('#user-story').fadeIn();
                    $('.story-arrow-message').fadeIn();
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
                    var isMobile = false; //initiate as false
                    // device detection
                    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
                        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
                          isMobile = true;
                    }
                    let whatsappUrl = "https://web.whatsapp.com/send";
                    if (isMobile == true) {
                      whatsappUrl = "https://wa.me/";
                    }
                    let referralCode = response.data.UserReferralCode;
                    let postUrl= "https://harfankijersey.mplsports.in/";
                    if(referralCode == null){
                     postUrl;
                    }else{
                      postUrl = "https://harfankijersey.mplsports.in/?refcode="+referralCode;
                    }
                    let postTitle = "Hey! I just got this certificate after sharing my story on Har Fan Ki Jersey. Help team India get their new T20 World Cup jersey and win exciting prizes. Click here: " +postUrl;
                    let postTwitter = "Hey! I just got this certificate after sharing my story on &hashtags=HarFanKiJersey. Help team India get their new T20 World Cup jersey and win exciting prizes. Click here: " +postUrl;
               
                    // let postImg = encodeURI(pinterestImg.src);
                    $("#whatsShare").attr("href", whatsappUrl+'?text='+postTitle );
                    $("#facebookShare").attr("href", url+'?u='+response.data.CertURL);
                    $("#twitterShare").attr("href", twitterUrl+'?text='+postTwitter);    
                    $("#facebookShares").attr("href", url+'?u='+response.data.CertURL);
                    $("#twitterShares").attr("href", twitterUrl+'?text='+postTwitter);
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
          //$.LoadingOverlay("show");
          $("#uploadFormPopup").fadeOut();
          var url = "https://c12xl1ybn0.execute-api.ap-south-1.amazonaws.com/Stage/UserStories/storyflow";
          $http.post(url, JSON.stringify(datas), config).then(function (response) 
          {
            $.LoadingOverlay("hide");
            if (response.data != null)
              $scope.storyUploaded = true;
              $('#user-story').fadeIn();
              $scope.userStory  = response.data;
              $.LoadingOverlay("hide");
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
              var isMobile = false; //initiate as false
              // device detection
              if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
                  || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
                  isMobile = true;
              }
              let whatsappUrl = "https://web.whatsapp.com/send";
              if (isMobile == true) {
                whatsappUrl = "https://wa.me/";
              }
              
              let referralCode = response.data.UserReferralCode;
              let postUrl= "https://harfankijersey.mplsports.in/";
              if(referralCode == null){
               postUrl;
              }else{
                postUrl = "https://harfankijersey.mplsports.in/?refcode="+referralCode;
              }
              let postTitle = "Hey! I just got this certificate after sharing my story on Har Fan Ki Jersey. Help team India get their new T20 World Cup jersey and win exciting prizes. Click here: " +postUrl;
              let postTwitter = "Hey! I just got this certificate after sharing my story on &hashtags=HarFanKiJersey. Help team India get their new T20 World Cup jersey and win exciting prizes. Click here: " +postUrl;
                            
              // let postImg = encodeURI(pinterestImg.src);
              $("#whatsShare").attr("href", whatsappUrl+'?text='+postTitle );
              $("#facebookShare").attr("href", url+'?u='+response.data.CertURL);
              $("#twitterShare").attr("href", twitterUrl+'?text='+postTwitter);    
              $("#facebookShares").attr("href", url+'?u='+response.data.CertURL);
              $("#twitterShares").attr("href", twitterUrl+'?text='+postTwitter);
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