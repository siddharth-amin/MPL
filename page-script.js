$(document).ready(function (){
    scrollFlag = true;
    $(function () {
        $('[data-toggle="popover"]').popover({
            trigger: 'focus',
            container: 'body',
            html: true,
            sanitize: false,
            content: function() {
                return $(this).attr("data-content");
              }
        })
      })

      const video = document.querySelector('video');

      video.addEventListener('ended', (event) => {
          $('.video-container').fadeOut();
          introAnimation();
      })

      if (window.innerHeight > window.innerWidth){
        video.src="https://thinktreemedia.in/MPL-Certificate/videos/Scroll%20down_5%20sec_vertical_without_text.mp4";
      }

});

function openSignInRegister(){
    $('#signinRegisterPopup').fadeIn();
}
function openSignIn(){
    $('#signInPopup').fadeIn();
}
function openUploadForm(){
    $('#uploadFormPopup').fadeIn();
}
function openLeaderboard(){
    $('#leaderboardPopup').fadeIn();
}
function openRewards(){
    $('#spinWheelPopup').fadeIn();
}
$(document).scroll(function() {
    if ($document.scrollTop() >= 5) {
    } else {
      //$element.removeClass(className);
    }
  });

  $(window).bind('mousewheel DOMMouseScroll', function(event){
    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
        // scroll up
    }
    else {
        // scroll down
        if(scrollFlag){
            firstAnimation();
            scrollFlag = false;
        }
        
    }
});
$(document.body).on('touchmove', onScroll); // for mobile
$(window).on('scroll', onScroll); 

// callback
function onScroll(){ 
    if(scrollFlag){
        firstAnimation();
        scrollFlag = false;
    }
    /*if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) { 
        track_page++; 
        load_contents(track_page); 
    }*/
}

$('.popup').on('click', function(e) {
    $(this).fadeOut();
}).on('click', '.popup-inner', function(e) {
    // clicked on descendant div
    e.stopPropagation();
});

function firstToSecondAnim(){
    firstOut();
    secondAnimation();
}
function firstToThirdAnim(){
    firstOut();
    thirdAnimation();
}
function secondToThirdAnim(){
    secondOut();
    thirdAnimation();
}

function introAnimation(){
    $('.jersey-img').addClass('animate__zoominslow');
    setTimeout(() => {
        $("#landingMainText").addClass('animate__fadeInUp');
    }, 800);
    setTimeout(() => {
        $('.jersey-img').removeClass('animate__zoominslow');
        $('.jersey-img').addClass('floating-animation');
        
    }, 1000);
    setTimeout(() => {
        $("#landingSubtitle").addClass('animate__fadeInUp');    
    }, 1200);
}

function firstAnimation(){
    $("#landingMainText").addClass('animate__fadeOutUp');
    $("#landingSubtitle").addClass('animate__fadeOutLeft');
    $("#jerseyImage").removeClass("jersey-center floating-animation");
    $("#slide-t-1").addClass('display-block');
    $('.first__animate').addClass('animate__fadeInUp');
}

function firstOut(){
    $(".first__animate").removeClass('animate__fadeInUp');
    setTimeout(() => {
        $("#slide-t-1").addClass('animate__fadeOutUp');        
    }, 300);
    setTimeout(() => {
        $("#slide-t-1").removeClass('display-block animate__fadeInUp');
    }, 800);
}

function secondAnimation(){
    setTimeout(() => {
        $("#slide-t-2").addClass('display-block');
        $('.second__animate').addClass('animate__fadeInUp');
        $('.story').fadeIn();
        $('.progress-container').fadeIn().addClass('animate__fadeIn');
    }, 800);
    
}
function secondOut(){
    $("#slide-t-2").addClass('animate__fadeOutUp');
    setTimeout(() => {
        $('#uploadFormPopup').fadeOut();
        $("#slide-t-2").removeClass('display-block animate__fadeInUp');
    }, 500);
}

function thirdAnimation(){
    //$(".first__animate").removeClass('animate__fadeInUp');
    setTimeout(() => {
        $("#slide-t-3").addClass('display-block');
        $('.third__animate').addClass('animate__fadeInUp');
        $('.user-story').fadeIn();
        $('.story-arrow-message').fadeIn();
        $('#certificatePopup').fadeIn();
    }, 500);
}

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

  function spinTheWheel(){
    $('#wheel').addClass('spin-the-wheel');
}

function copyToClipboard() {
    /* Get the text field */
    var copyText = document.getElementById("referralcode");
    
    /* Select the text field */
    //copyText.select();
    //copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText( 'test-url?refcode=' + copyText.innerHTML);
  
    /* Alert the copied text */
    $('#ctc-btn').tooltip('show');
  }




  var text = ["LOYAL", "PASSIONATE", "AGGRESSIVE", "HARDCORE"];
var counter = 0;
var elem = document.getElementById("changeText");
var inst = setInterval(change, 2000);

function change() {
  elem.innerHTML = text[counter];
  counter++;
  if (counter >= text.length) {
    counter = 0;
    // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
  }
}


//Run when certificate received:
function addMeta(){
    var meta = document.createElement('meta');
    //Add parameters for OpenGraph meta tags
    document.getElementsByTagName('head')[0].appendChild(meta);
}

/*WhatsaApp : https://wa.me/?text=I'm%20inquiring%20about%20the%20apartment%20listing'

Reference: https://faq.whatsapp.com/452366545421244/?locale=en_US
*/
/*Twitter : https://twitter.com/intent/tweet?hashtags=demo&text=Hello%20world&url=https%3A%2F%2Fexample.com%2Ffoo&via=twitterdev

Reference: https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
*/
/*Facebook :

<meta property="og:url"                content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html" />
<meta property="og:type"               content="article" />
<meta property="og:title"              content="When Great Minds Don’t Think Alike" />
<meta property="og:description"        content="How much does culture influence creative thinking?" />
<meta property="og:image"              content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />


Reference: https://developers.facebook.com/docs/sharing/webmasters
*/

const modelViewerVariants = document.querySelector("model-viewer#jersey");
const storyGrid = $('.story-grid');
$('#jersey').css({'height': storyGrid.height(),'width': storyGrid.width}());
modelViewerVariants.addEventListener('load', () => {
  const names = modelViewerVariants.availableVariants;
  for (const name of names) {
    //const option = document.createElement('option');
    //option.value = name;
    //option.textContent = name;
    //select.appendChild(option);
    console.log(name);
    
  }
  modelViewerVariants.variantName = 'White';
  // Adds a default option.
  const option = document.createElement('option');
    option.value = 'default';
    option.textContent = 'Default';
    select.appendChild(option);
});

//select.addEventListener('input', (event) => {
//  modelViewerVariants.variantName = event.target.value === 'default' ? null : event.target.value;
//});