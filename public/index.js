$(window).on("scroll", function(){
  if($(window).scrollTop() > 350){
    $(".home-nav").css("background-color", "#94806A");
  }
  else {
    $(".home-nav").css("background-color", "");
  }
});

function toggleForm(form1, form2){
  $(`#${form1}`).css("background-color", "#B0E2F8");
  $(`#${form2}`).css("background-color", "#ffffff");
  $(`#${form1}-form`).show();
  $(`#${form2}-form`).hide();
}
// CLICK ON LOG IN
$('.rectangle').on('click', '.login', function(event) {
   toggleForm("login", "signup")
});
// CLICK ON SIGN UP
$('.rectangle').on('click', '.signup', function(event) {
   toggleForm("signup", "login")
});
$('#sidebar-login').click(function(event) {
   toggleForm("login", "signup")
});
$('#sidebar-signup').click(function(event) {
   toggleForm("signup", "login")
});

$('.home-nav').on('click', '.sidebar-menu', function(event) {
  event.preventDefault();
  $('.sidebar-bg').toggleClass("hidden");
  $('.sidebar-top').toggleClass("hidden");
});

$(".sidebar-button").click(function(event){
  $('.sidebar-bg').addClass("hidden");
  $('.sidebar-top').addClass("hidden");
});

// SIGN IN
$('.submit-button').click(function(event) {
  $('.display-start').addClass("hidden");
  $('.rectangle').addClass("hidden");
  $('.about-section').addClass("hidden");
  $('.bg-journal').removeClass("hidden");
  $('.post-display').removeClass("hidden");
  $('.foot-nav').addClass("hidden");
  $('.foot-nav2').removeClass("hidden");
});
