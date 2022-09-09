$(document).ready(() => {
	$('#fullpage').fullpage({
		//options here
        licenseKey: 'K3HL6-Q63U6-H63C6-V4QG8-OMVJN',
		autoScrolling:true,
		scrollHorizontally: true,
        scrollingSpeed: 1000,
        fade : true,
        cardsOptions: {perspective: 100, fadeContent: true, fadeBackground: true},
        afterLoad : (origin, destination, direction, trigger) => {
            var origin = this;
            if(destination.index == 1){
                $('.first_animate').addClass('animate__fadeInUp');
                turnJersey();
            }
            if(destination.index == 2){
                $('.second_animate').addClass('animate__fadeInUp');
                $.when(progressBar(60)).then(() => {
                    $('.second_hold_animate').addClass('animate__fadeInUp');
                });
                turnJersey();
            }
            if(destination.index == 3){
                $('.third_animate').addClass('animate__fadeInUp');
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
                $('.first_animate').removeClass('animate__fadeInUp');
            }
            if(origin.index == 2){
                $('.second_animate').removeClass('animate__fadeInUp');
                $('.second_hold_animate').removeClass('animate__fadeInUp');
            }
            if(origin.index == 3){
                $('.third_animate').removeClass('animate__fadeInUp');
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
});
turnJersey = () =>{
    model.modelViewerVariants.resetTurntableRotation(0);
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