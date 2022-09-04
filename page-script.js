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
});

function openSignInRegister(){
    $('#signinRegisterPopup').fadeIn();
    console.log("This triggered");
}
function openSignIn(){
    $('#signInPopup').fadeIn();
    console.log("This triggered");
}
function openUploadForm(){
    $('#uploadFormPopup').fadeIn();
    console.log("This triggered");
}
function openLeaderboard(){
    $('#leaderboardPopup').fadeIn();
    console.log("This triggered");
}

$(document).scroll(function() {
    if ($document.scrollTop() >= 50) {
        console.log("Moved");
      // user scrolled 50 pixels or more;
      // do stuff
      //$element.addClass(className);
    } else {
        console.log("Nothing")
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
            console.log("Moved");
            firstAnimation();
            scrollFlag = false;
        }
        
    }
});

$('.popup').on('click', function(e) {
    $(this).fadeOut();
}).on('click', '.popup-inner', function(e) {
    // clicked on descendant div
    e.stopPropagation();
});

function firstAnimation(){
    $("#landingMainText").addClass('animate__fadeOutUp');
    $("#landingSubtitle").addClass('animate__fadeOutUp');
    $("#jerseyImage").removeClass("jersey-center floating-animation");
    $("#slide-t-1").addClass('display-block');
    $('.first__animate').addClass('animate__fadeInRight');
}

function secondAnimation(){
    $(".first__animate").removeClass('animate__fadeInUp');
    setTimeout(() => {
        $("#slide-t-1").addClass('animate__fadeOutUp');
            
    }, 300);
    setTimeout(() => {
        $("#slide-t-2").addClass('display-block');
        $('.second__animate').addClass('animate__fadeInUp');
        $("#slide-t-1").removeClass('display-block animate__fadeInUp');
        $('.story').fadeIn();
    }, 800);
    
}

function thirdAnimation(){
    $(".first__animate").removeClass('animate__fadeInUp');
    $("#slide-t-2").addClass('animate__fadeOutUp');
    setTimeout(() => {
        $('#uploadFormPopup').fadeOut();
        $("#slide-t-3").addClass('display-block');
        $('.third__animate').addClass('animate__fadeInUp');
        $("#slide-t-2").removeClass('display-block animate__fadeInUp');
            
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