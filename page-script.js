$(document).ready(() => {
});
    startFlag = false;
    
	$('#fullpage').fullpage({
		//options here
        licenseKey: 'K3HL6-Q63U6-H63C6-V4QG8-OMVJN',
		autoScrolling:true,
		scrollHorizontally: true,
        scrollingSpeed: 1000,
        scrollOverflow: false,
        fade : true,
        cardsOptions: {perspective: 100, fadeContent: true, fadeBackground: true},
        afterLoad : (origin, destination, direction, trigger) => {
            var origin = this;
            if(destination.index == 0){
                if(startFlag){
                $('.left-col-wide .zero_animate').addClass('animate__fadeInLeftShort');
                $('.right-col-wide .zero_animate').addClass('animate__fadeInRightShort');
                $('.zero_animate_bottom').addClass('animate__fadeInUpShort');
                //$('.jersey-container').css({'z-index':'1'});
                turnJersey();
                }
            }
            if(destination.index == 1){
                $('.left-col .first_animate').addClass('animate__fadeInLeftShort');
                $('.right-col .first_animate').addClass('animate__fadeInRightShort');
                turnJersey();
                resizeJerseySize();
                updateScale(1)
                //$('.jersey-container').css({'z-index':'0'});
                $('.Hotspot').css({opacity:0});
            }
            if(destination.index == 2){
                $('.left-col .second_animate').addClass('animate__fadeInLeftShort');
                $('.right-col .second_animate').addClass('animate__fadeInRightShort');
                $('.right-col .second_animate-down').addClass('animate__fadeInDownShort');
                $.when(progressBar(60)).then(() => {
                    $('.left-col .second_hold_animate').addClass('animate__fadeInLeftShort');
                    $('.right-col .second_hold_animate').addClass('animate__fadeInRightShort');
                });
                turnJersey();
                increaseJerseySize();
                updateScale(1.1);
                $('.Hotspot').css({opacity:1});
            }
            if(destination.index == 3){
                $('.left-col .third_animate').addClass('animate__fadeInLeftShort');
                $('.right-col .third_animate').addClass('animate__fadeInRightShort');
                turnJersey();
                $('.Hotspot').css({opacity:0});
            }
            /*if(direction == 'down'){
                console.log(destination.index);
                $('.left-square').addClass("animate-move-up");
                $('.right-square').addClass("animate-move-down");
            }*/
        },
        onLeave : (origin, destination, direction, trigger) => {
            animateSquares(direction, destination.index);
            console.log(origin.index)
            if(origin.index == 0){
                $('.zero_animate').removeClass('animate__fadeInLeftShort animate__fadeInRightShort');
                $('.zero_animate_bottom').removeClass('animate__fadeInUpShort');
            }
            if(origin.index == 1){
                $('.first_animate').removeClass('animate__fadeInLeftShort animate__fadeInRightShort');
            }
            if(origin.index == 2){
                $('.second_animate').removeClass('animate__fadeInLeftShort animate__fadeInRightShort');
                $('.second_hold_animate').removeClass('animate__fadeInLeftShort animate__fadeInRightShort');
                $('.second_animate-down').removeClass('animate__fadeInDownShort');
            }
            if(origin.index == 3){
                $('.third_animate').removeClass('animate__fadeInLeftShort animate__fadeInRightShort');
            }
        }
        
	});

	//methods
	//$.fn.fullpage.setAllowScrolling(false);
    const modelViewerVariants = document.querySelector("model-viewer#jersey");
    $('#jersey').css({'height': $('.jersey-container').height(),'width': $('.jersey-container').width()});
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
  /*const option = document.createElement('option');
    option.value = 'default';
    option.textContent = 'Default';
    select.appendChild(option);*/
});

$('.popup').on('click', function(e) {
    $(this).fadeOut();
}).on('click', '.popup-inner', function(e) {
    // clicked on descendant div
    e.stopPropagation();
});

$('.slider-container').slick({
    infinite:true,
    vertical:true,
    autoplay:true,
    pauseOnFocus: true,
    arrows:false,
  });
  $('.up-arrow').on('click',() => {
    $('.slider-container').slick("slickPrev");
  });
  $('.down-arrow').on('click',() => {
    $('.slider-container').slick("slickNext");
  });

  $('.tab-icon').on('click',(e) => {
    $('.for-tab-text').text($(e.currentTarget).data('content'));
  })

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
  const video = document.querySelector('video');
  video.addEventListener('ended', (event) => {
    $('.video-container').fadeOut();
    $('.jersey-container').css({opacity:1});
    $('.bg-square').removeClass('animate-move-left animate-move-right');
    $('.left-col-wide .zero_animate').addClass('animate__fadeInLeftShort');
    $('.right-col-wide .zero_animate').addClass('animate__fadeInRightShort');
    $('.zero_animate_bottom').addClass('animate__fadeInUpShort');
    $('.jersey-container').css({'z-index':'1'});
    startFlag = true;
});

if (window.innerHeight > window.innerWidth){
  video.src="https://thinktreemedia.in/MPL-Certificate/videos/Scroll%20down_5%20sec_vertical_without_text.mp4";
}
turnJersey = (modelViewerVariants) =>{
    modelViewerVariants2 = document.querySelector("model-viewer#jersey");
    modelViewerVariants2.resetTurntableRotation(0);
}
progressBar = (progVal) => {
    progress = 0;
    $('.progress-bar-blue').animate({width: progVal + '%'}, {duration:2000, step: (now) =>{
        $('.progress-tracker').html(Math.ceil(now) + '%');
    }});
    $('.progress-tracker').animate({left: progVal + '%'},2000, () =>{
        
    });
}

openStoryPopup = () => {
    $('.story-popup').addClass('animate__fadeInLeftShort');
    
}

animateSquares = (direction, steps) => {
    console.log(45 - (steps * 90)%360, 45 + (steps * 90)%360);
        $('.left-square').css({
            top : steps%2 == 0 ? '0%' : '-50%',
            transform : 'rotate(' + (45 - (steps * 90))%360 + 'deg)'
        });
        $('.right-square').css({
            top : steps%2 == 0 ? '-50%' : '0',
            transform : 'rotate(-' + (45 + (steps * 90))%360 + 'deg)'
        });
    
    
}

function openLeaderboard(){
    $('#leaderboardPopup').fadeIn();
}

function increaseJerseySize(){
    //$('.jersey-container').css({'width':'40%'});
    //$('#jersey').css({'height': $('.jersey-container').height(),'width': $('.jersey-container').width()});
    $('.left-square').css({'left':'-60%'});
    $('.right-square').css({'left':'90%'});
}
function resizeJerseySize(){
    //$('.jersey-container').css({'width':'30%'});
    //$('#jersey').css({'height': $('.jersey-container').height(),'width': $('.jersey-container').width()});
    $('.left-square').css({'left':'-50%'});
    $('.right-square').css({'left':'80%'});
}



updateScale = (val) => {
    const modelViewerTransform = document.querySelector("model-viewer#jersey");
    modelViewerTransform.scale = ''+val+' '+val+' '+val+'';
  };
function openUploadForm(){
    $('#uploadFormPopup').fadeIn();
}

function openCertificateImage(){
    fullpage_api.moveSectionDown();
    $('#uploadFormPopup').fadeOut();
    $('#certificatePopup').fadeIn();
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

  $('.Hotspot').on('click',(e)=>{
    $('.sp-profilepic').attr('src','' + $(e.currentTarget).data('profilepic') + '') ;
    $('.sp-storyimg').attr('src','' + $(e.currentTarget).data('story') + '') ;
    $('.sp-name').text($(e.currentTarget).data('name'));
    $('.sp-message').text($(e.currentTarget).data('message'));
    openStoryPopup();
  });

  $('#jersey').on('onmouseover',() => {
    $('#jersey').removeAttribute('auto-rotate');
  });
  $('#jersey').on('onmouseleave',() => {
    $('#jersey').addAttribute('auto-rotate');
  });

 function getCoordinates(){
    let x = "c0.05421040709118641m 0.13846178555043182m 0.11483288825679787m"
    return x;
  }
