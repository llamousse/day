$(window).on("scroll", function(){
  console.log($(window).scrollTop());
  if($(window).scrollTop() > 350){
    $(".home-nav").css("background-color", "#94806A");
  }
  else {
    $(".home-nav").css("background-color", "");
  }
});

// CLICK ON LOG IN
$('.search-form').on('click', '.submit-login', function(event) {
  $('#login').css("background-color", "#B0E2F8");
  $('.submit-signup').css("background-color", "");
  $('#firstname').addClass("hide-this");
  $('#lastname').addClass("hide-this");
  $('#email').prop('required', true);
  $('#password').prop('required', true);
});

// CLICK ON SIGN UP
$('.search-form').on('click', '.submit-signup', function(event) {
  $('#signup').css("background-color", "#B0E2F8");
  $('#login').css("background-color", "");
  $('#email').prop('required', true);
  $('#password').prop('required', true);
  $('#firstname').removeClass("hide-this").prop('required', true);
  $('#lastname').removeClass("hide-this").prop('required', true);
});

// function handleClickOn() {
//   $('.sidebar-bg').removeClass("hide-this");
//   $('.home-nav').css("background-color", "#94806A");
//   $('.home-nav').css("width", "100%");
//   $('.about-section').addClass("hide-this");
//   $('.rectangle').addClass("hide-this");
//   $('.display-start').addClass("hide-this");
// }
//
// function handleClickOff() {
//     $('.sidebar-bg').addClass("hide-this");
//     $('.home-nav')
//       .css("background-color", "#94806A");
//       .css("width", "100%");
//     $('.about-section').addClass("hide-this");
//     $('.rectangle').addClass("hide-this");
//     $('.display-start').addClass("hide-this");
// }
// $('.sidebar-bg').on('click', handleClickOn);
// $('.sidebar-bg').off('click', handleClickOff);


$('.home-nav').on('click', '.sidebar-menu', function(event) {
  $('.sidebar-bg').removeClass("hide-this");
  $('.home-nav').css("background-color", "#94806A");
  // $('.home-nav').css("width", "50%");
  // $('.about-section').addClass("hide-this");
  // $('.rectangle').addClass("hide-this");
  // $('.display-start').addClass("hide-this");
});

  // $('html, body').bind('DOMMouseScroll mousewheel MozMousePixelScroll', function(e) {
  //   var scrollTo = 0;
  //
  //   if (e.type == 'mousewheel') {
  //       scrollTo = (e.originalEvent.wheelDelta * -1);
  //   }
  //   else if (e.type == 'DOMMouseScroll') {
  //       scrollTo = e.originalEvent.detail;
  //   }
  //
  //   if (scrollTo > 0) {
  //     e.preventDefault();
  //     return false;
  //   }
  // });
  //
  // $(this).unbind('click');
// });

// $('.home-nav').off('click', '.sidebar-menu', function(event) {
//   $('.sidebar-bg').addClass("hide-this");
//   $('.home-nav')
//     .css("background-color", "#94806A");
//     .css("width", "100%");
//   $('.about-section').addClass("hide-this");
//   $('.rectangle').addClass("hide-this");
//   $('.display-start').addClass("hide-this");
// });
