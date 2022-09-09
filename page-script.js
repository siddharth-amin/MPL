$(document).ready(() => {
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
            if(destination.index == 1){
                $('.left-col .first_animate').addClass('animate__fadeInLeftShort');
                $('.right-col .first_animate').addClass('animate__fadeInRightShort');
                turnJersey();
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
            }
            if(destination.index == 3){
                $('.left-col .third_animate').addClass('animate__fadeInLeftShort');
                $('.right-col .third_animate').addClass('animate__fadeInRightShort');
                turnJersey();
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
        $('#jersey').css({opacity:1});
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
});
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