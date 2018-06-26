$(window).on("scroll", function(){
  if($(window).scrollTop() > 350){
    $(".home-nav").css("background-color", "#94806A");
  }
  else {
    $(".home-nav").css("background-color", "");
  }
});

// CLICK ON LOG IN
$('.rectangle').on('click', '.login', function(event) {
  $('#login').css("background-color", "#B0E2F8");
  $('#signup').css("background-color", "#ffffff");
  $('#signup-form').hide();
  $('#login-form').show();
});

// CLICK ON SIGN UP
$('.rectangle').on('click', '.signup', function(event) {
  $('#signup').css("background-color", "#B0E2F8");
  $('#login').css("background-color", "#ffffff");
  $('#signup-form').show();
  $('#login-form').hide();
});


$('.home-nav').on('click', '.sidebar-menu', function(event) {
  event.preventDefault()
  $('.sidebar-bg').toggleClass("hidden");
  $('.sidebar-top').toggleClass("hidden");
});
