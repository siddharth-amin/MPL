app.controller('jerseyStory',function($scope,$rootScope,$http){

   //$scope.stories =[{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 1'},{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 2'},{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 3'},{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 4'},{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 5'},{name:'John Doe',url:'https://valstatandlakarklinik.se/wp-content/uploads/2016/10/orionthemes-placeholder-image.png',message:'Message 6'}]
   $scope.stories =[];
   $scope.dots =[];
    var configsa = {
        headers: {
            'Content-Type': "application/json",
            'APIKey' : 'MCBC7h57ty767689f43caf4x5h43wu9csfc5617uh65e7d8w10jqpbbMMLE'
        }
      };
     
    // $http.get('https://c12xl1ybn0.execute-api.ap-south-1.amazonaws.com/Stage/UserStories/getscstoriesv2', configsa).then(function (response) 
    // {
    //   if (response.data)
        $scope.stories1 = [
          {
            "Caption": "Harshit Yadav",
            "Message": "I have been following cricket since i was 14, I always idolised Indian greats and grew up watching the modern legends! I wish team India best of luck for upcoming tours and WC! i believe we can win the cup!! Biggest fan of Virat Kohli sir.",
            "StoryImageURL": "https://d1iazv54bx5ja3.cloudfront.net/MPLDATA/Stories/hardikpandya93-13092022-0001.jpg"
          },
          {
            "Caption": "Ajith Pravin Manukaran K N",
            "Message": "The spirit and the process make us a successful team. Forget all the past and get the cup. We want it back very badly.",
            "StoryImageURL": "https://d1iazv54bx5ja3.cloudfront.net/MPLDATA/Stories/inbound7019652310644404292.jpg"
          },
          {
            "Caption": "Naman Bawa",
            "Message": "Our Jersey colour is sky blue that's why our Indian players made to touch the glory of sky with thier incredible performance.",
            "StoryImageURL": "https://d1iazv54bx5ja3.cloudfront.net/MPLDATA/Stories/inbound2083746363131773052.jpg"
          },
          {
            "Caption": "Nitin Parchani",
            "Message": "As a fan we're excited to cheer our team india in the T20 world cup Australia. We had bad recent multi nations tournaments but that was dubai where toss played crucial role we're confident now about our team, captain and coach. Let's go India!🫶",
            "StoryImageURL": "https://d1iazv54bx5ja3.cloudfront.net/MPLDATA/Stories/inbound95631544104747171.jpg"
          },
          {
            "Caption": "Suyash Raul",
            "Message": "We are with our Team India no matter what \n#T20Aus Is ours \nWe are the champions 🏆",
            "StoryImageURL": "https://d1iazv54bx5ja3.cloudfront.net/MPLDATA/Stories/inbound6284568839342201570.jpg"
          },
          {
            "Caption": "Manish Chauhan",
            "Message": "I started playing cricket when Team India left the world cup after 28 year and from that time everything changed for me now I am Battling and my role in team is play your fearless games and go on 4 down for team.",
            "StoryImageURL": "https://d1iazv54bx5ja3.cloudfront.net/MPLDATA/Stories/B9E76A9F-DB05-4D2E-BBF0-DC7352696D68.jpeg"
          },
          {
            "Caption": "Prince Sanghvi",
            "Message": "Pitches Don't Matter\nPerformance Does\nWinning Or Loosing Doesn't Matter\nTeam India's Presence Does\n\nAs\n\nTogether We'll Play,\nTogether We'll Cheer.\nTogether We'll Win,\nTogether We'll Celebrate",
            "StoryImageURL": "https://d1iazv54bx5ja3.cloudfront.net/MPLDATA/Stories/Photo_1582171861475.png"
          },
          {
            "Caption": "Navyan Boddu",
            "Message": "Cricket is Just Not a Sport !! It's an emotion. When It Comes To Team India The Emotion is Very Special..We Celebrate When We Win. We Cry When We Lose. I am Really Excited for The New Indian Jersey.All The Best Team India for ICC World T20 World Cup",
            "StoryImageURL": "https://d1iazv54bx5ja3.cloudfront.net/MPLDATA/Stories/inbound6604598800166924669.jpg"
          },
          {
            "Caption": "Jaydeep Das",
            "Message": "We believe in team india 🇮🇳 ! We are always there no matter whatever is the situation... It's a game and win and loss are part of it. Come on team india 🇮🇳",
            "StoryImageURL": "https://d1iazv54bx5ja3.cloudfront.net/MPLDATA/Stories/inbound6519594075649559513.jpg"
          },
          {
            "Caption": "Govind Chhimpa",
            "Message": "Do some extraordinarily......\nGo india and conquer the Melbourne 🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳",
            "StoryImageURL": "https://d1iazv54bx5ja3.cloudfront.net/MPLDATA/Stories/IMG_20220913_201407_138.jpg"
          },
          {
            "Caption": "Shiva Soni",
            "Message": "I was only 4 years old when India won the 2007 world cup , and i barely remember any of that moment. So now I want to relive that moment when India will become T20 champions again , bring the cup home my favourites.",
            "StoryImageURL": "https://d1iazv54bx5ja3.cloudfront.net/MPLDATA/Stories/inbound8741134763933842873.jpg"
          },
          {
            "Caption": "Sourav Panda",
            "Message": "It all started Back in 2003 WC when I start watching cricket. and now I am such a huge cricket fan. S Gill is currently my favourite player. But my all time favourite is DADA. Dada did wonders with this indian team. Now its time for Rohit to do such magic in Australia.",
            "StoryImageURL": "https://d1iazv54bx5ja3.cloudfront.net/MPLDATA/Stories/WhatsApp%20Image%202022-09-13%20at%202.29.15%20PM.jpeg"
          },
          {
            "Caption": "Jagdish C",
            "Message": "Missing MAHI",
            "StoryImageURL": "https://d1iazv54bx5ja3.cloudfront.net/MPLDATA/Stories/IMG_20220826_205118.jpg"
          },
          {
            "Caption": "Arafath A S",
            "Message": "I get goosebumps for every sixes hit by hitman 🔥🔥",
            "StoryImageURL": "https://d1iazv54bx5ja3.cloudfront.net/MPLDATA/Stories/A9A40C50-A62B-429E-AB21-165387C89876.jpeg"
          },
          {
            "Caption": "Rutwik Sawant",
            "Message": "Yes We Expect The Cup From You, But All I'll Say Is....I Love My Team And I Want You All To Just Go And Enjoy Out There.....Please Don't Feel Any Pressure Of Expectations.....You All Guys Are Absolute Champions In My Eyes From Very First Day.💙 All The Very Best Guys🤞🏻 गणपती बाप्पा मोरया 🤗",
            "StoryImageURL": "https://d1iazv54bx5ja3.cloudfront.net/MPLDATA/Stories/inbound7273558403497156845.jpg"
          }
        ];
        $scope.points = [ 
            {point: '0.05421040709118641m 0.13846178555043182m 0.11483288825679787m', norm: '0.07117410476028291m 0.3647820401904624m 0.9283686282754584m'},
{point: '0.09850393664801473m -0.019346323175682967m 0.12054673253507989m', norm: '0.21336083531096203m -0.030998638862593127m 0.9764815606779654m'},
{point: '-0.04259377235491084m 0.04620512862846099m 0.13036630184070286m', norm: '-0.030438606716839994m 0.11694352223102922m 0.9926720021383391m'},
{point: '0.01637513552723957m -0.0874222520263764m 0.1477154729966984m', norm: '0.0913802014497781m 0.11162763976735533m 0.98953975605984m'},
{point: '-0.0819203225592605m -0.13805806652571484m 0.13843531542396093m', norm: '-0.5198609811662367m 0.06760922002335468m 0.8515712263978343m'},
{point: '-0.0027185618894408348m -0.25675272409894645m 0.15149891033472246m', norm: '-0.4211158475742747m -0.025146788697041796m 0.9066581946577368m'},
{point: '-0.09270079112276212m -0.26913337743439136m 0.1352649398673806m', norm: '-0.38376420381335485m -0.010419646469471489m 0.9233723338063325m'},
{point: '0.08956651262387712m -0.09642581019239196m -0.1052194546356082m', norm: '0.4973121202923307m -0.07702046440278207m -0.8641461121092464m'},
{point: '-0.08979025511567161m -0.034822879913291915m -0.11666985157843365m', norm: '-0.15621352770789515m -0.04303601172374984m -0.9867853036278803m'},
{point: '0.006049882919767116m 0.010521602377882577m -0.11630229258254933m', norm: '-0.01610932772980417m 0.0027352857291047944m -0.9998664949742411m'},
{point: '0.10470193573565378m 0.06951880409853356m -0.11286663414754367m', norm: '0.3033364611978837m -0.06417314547836078m -0.9507201474184493m'},
{point: '-0.1603080710571682m 0.1705019528697274m -0.10855368987300963m', norm: '-0.2868409417341345m 0.11531994691889516m -0.9510118737364419m'},
{point: '0.12864996935603873m 0.16995165369341642m -0.10945751564084014m', norm: '0.31315941098389055m 0.09586057392488999m -0.9448502175895467m'},
{point: '-0.035788379581460444m -0.18217626672127274m -0.11605881213070822m', norm: '-0.014305222539579575m -0.014489359913673897m -0.9997926880395682m'},
{point: '0.07335223837054108m -0.1922522802142988m 0.13274162067944037m', norm: '0.4969427896203534m 0.04325288238091202m 0.8667047086580781m'},
         ]
        $scope.stories1.forEach(element => {
          //let x = randomIntFromInterval(-1,1) + " " + randomIntFromInterval(-1, 1) + " " + randomIntFromInterval(-1, 1);
          $scope.stories.push({name: element.Caption, url: element.StoryImageURL, message: element.Message});
          $scope.dots.push({name: element.Caption, url: element.StoryImageURL, message: element.Message});
        });
        $scope.stories = JSON.parse(angular.toJson($scope.stories));
        $scope.dots = JSON.parse(angular.toJson($scope.dots));
        setTimeout(function() {
            $('.Hotspot').on('click',(e)=>{
                $('.sp-profilepic').attr('src','' + $(e.currentTarget).data('profilepic') + '') ;
                $('.sp-storyimg').attr('src','' + $(e.currentTarget).data('story') + '') ;
                $('.sp-name').text($(e.currentTarget).data('name'));
                $('.sp-message').text($(e.currentTarget).data('message'));
                openStoryPopup();
              });
            
        }, 100);
       }, function (response) {
          console.log(response);
       $scope.headers = response.headers();
    })
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
    
//});

app.controller('userStoryMode', function($scope,$http){
    /*var data = {}
    $http.post("",data).then(function successCallback(response){
        
    },function errorCallback(response){
        
    })*/
});

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }