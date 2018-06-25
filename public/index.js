$(window).on("scroll", function(){
  console.log($(window).scrollTop());
  if($(window).scrollTop() > 350){
    $(".home-nav").css("background-color", "#4FA0B9");
  }
  else {
    $(".home-nav").css("background-color", "");
  }
});


// CLICK ON SIGN UP
// $('.search-form').on('click', function() {

  // if($('.submit-button').on('click')) {
  //   $('email').attr("required", "true");
  //   $('password').attr("required", "true");
  // }

  // if($('.submit-login').on('click')) {
  //   $('.submit-login').css("background-color", "#B0E2F8");
  //   $('.submit-signup').css("background-color", "");
  //   $('#firstname').addClass("hide-this");
  //   $('#lastname').addClass("hide-this");
  //   $('email').attr("required", "true");
  //   $('password').attr("required", "true");
  // }

function loadLogin() {
  if($('.search-form').on('click', '.submit-login')) {
    $('.submit-login').css("background-color", "#B0E2F8");
    $('.submit-signup').css("background-color", "");
    $('#email').prop('required', true);
    $('#password').prop('required', true);
  }



  // $('.search-form').on('click', '.submit-login', function(event) {
  //   $('.submit-login').css("background-color", "#B0E2F8");
  //   $('.submit-signup').css("background-color", "");
  //   $('email').prop('required', true);
  //   $('password').prop('required', true);

  // $('.submit-login').on('click')) {
  //   $('.submit-login').css("background-color", "#B0E2F8");
  //   $('.submit-signup').css("background-color", "");
  //   // $('#firstname').addClass("hide-this");
  //   // $('#lastname').addClass("hide-this");
  //   $('email').attr("required", "true");
  //   $('password').attr("required", "true");



}
  // else if ($('.submit-signup').on('click')) {
  //   $('.submit-signup').css("background-color", "#B0E2F8");
  //   $('.submit-login').css("background-color", "");
  //   $('#firstname').removeClass("hide-this").attr("required", "true");
  //   $('#lastname').removeClass("hide-this").attr("required", "true");
  //   $('email').attr("required", "true");
  //   $('password').attr("required", "true");
  // }


// });

// $('.search-form').on('click', function() {
//   if ($('.submit-signup').on('click')) {
//     $('.submit-signup').css("background-color", "#B0E2F8");
//     $('.submit-login').css("background-color", "");
//     $('#firstname').removeClass("hide-this").attr("required", "true");
//     $('#lastname').removeClass("hide-this").attr("required", "true");
//     $('email').attr("required", "true");
//     $('password').attr("required", "true");
//   }
// });
