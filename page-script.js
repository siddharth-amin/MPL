$(document).ready(function() {
	/*$('#fullpage').fullpage({
		//options here
		autoScrolling:true,
		scrollHorizontally: true
	});

	//methods
	$.fn.fullpage.setAllowScrolling(false);*/
    /*const modelViewerVariants = document.querySelector("model-viewer#jersey");
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
    select.appendChild(option);*+/
});*/
});

function progressBar(){
    progress = 0;
    progCount = setInterval(() => {
        $('.progress-tracker').html(progress >= 40 ? 40 + '%' : progress++ + '%');
    }, 45);
    $('.progress-bar-blue').animate({width: '40%'},2000, () =>{});
    $('.progress-tracker').animate({left: '40%'},2000, () =>{
        clearInterval(progCount);
        openStoryPopup()
    });
}

function openStoryPopup(){
    $('.story-popup').addClass('animate__fadeInLeft');
    
}