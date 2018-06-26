$(window).on("scroll", function(){
  console.log($(window).scrollTop());
  if($(window).scrollTop() > 350){
    $(".home-nav").css("background-color", "#4FA0B9");
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
