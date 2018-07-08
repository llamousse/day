$(window).on("scroll", function() {
  if($(window).scrollTop() > 350) {
    $(".home-nav").css("background-color", "#94806A");
  }
  else {
    $(".home-nav").css("background-color", "");
  }
});

function toggleForm(form1, form2) {
  $(`#${form1}`).css("background-color", "#B0E2F8");
  $(`#${form2}`).css("background-color", "#ffffff");
  $(`#${form1}-form`).show();
  $(`#${form2}-form`).hide();
}

function togglePostForm(opt1, opt2, opt3, opt4) {
  $(`#${opt1}`).css("background-color", "#B0E2F8");
  $(`#${opt2}`).css("background-color", "#ffffff");
  $(`#${opt3}`).css("background-color", "#ffffff");
  $(`#${opt4}`).css("background-color", "#ffffff");
}

function sideBarMenu() {
  $('.sidebar-bg').toggleClass("hidden");
  $('.sidebar-top').toggleClass("hidden");

  $(".sidebar-button").click(function(event){
    $('.sidebar-bg').addClass("hidden");
    $('.sidebar-top').addClass("hidden");
  });
}

function loggedIn() {
  $('.sidebar-bg').addClass("hidden");
  $('.display-start').addClass("hidden");
  $('.rectangle').addClass("hidden");
  $('.about-section').addClass("hidden");
  $('.bg-journal').removeClass("hidden");
  $('.post-display').removeClass("hidden");
  $('.foot-nav').addClass("hidden");
  $('.foot-nav2').removeClass("hidden");
  $('#text').css("background-color", "#B0E2F8");
  $('.post-desc').removeClass("hidden");

  $('.home-nav').on('click', '.sidebar-menu', function(event) {
    event.preventDefault();
    $('.sidebar-button').hide();
    $('.jsidebar-button').show();
  });

  $('.jsidebar-button').click(function(event){
    $('.sidebar-bg').addClass("hidden");
    $('.sidebar-top').addClass("hidden");
  });
}

function loggedOut() {
  $('.sidebar-bg').toggleClass("hidden");
  $('.display-start').removeClass("hidden");
  $('.rectangle').removeClass("hidden");
  $('.about-section').removeClass("hidden");
  $('.bg-journal').addClass("hidden");
  $('.post-display').addClass("hidden");
  $('.foot-nav').removeClass("hidden");
  $('.foot-nav2').addClass("hidden");

  $('.home-nav').on('click', '.sidebar-menu', function(event) {
    event.preventDefault();
    $('.sidebar-button').show();
    $('.jsidebar-button').hide();
  });

  $('.jsidebar-button').click(function(event){
    $('.sidebar-bg').addClass("hidden");
    $('.sidebar-top').addClass("hidden");
  });

  $('.sidebar-bg').toggleClass("hidden");
  $('.jsidebar-button').addClass("hidden");
  $('.sidebar-button').toggleClass("hidden");
}

//////////////////////////////////////////////////////////////

$('.home-nav').on('click', '.sidebar-menu', function(event) {
  event.preventDefault();
  sideBarMenu();
});

$('.rectangle').on('click', '.login', function(event) {
   toggleForm("login", "signup");
});
$('.rectangle').on('click', '.signup', function(event) {
   toggleForm("signup", "login");
});
$('#sidebar-login').click(function(event) {
   toggleForm("login", "signup");
});
$('#sidebar-signup').click(function(event) {
   toggleForm("signup", "login");
});

$('.submit-button').click(function(event) {
  loggedIn();
});
$('#logout').click(function(event) {
  loggedOut();
});

$('#yt').click(function(event) {
  togglePostForm("yt", "img", "gm", "text");
  $('.img-desc').addClass("hidden");
  $('.post-desc').addClass("hidden");
  $('.gm-desc').addClass("hidden");
  $('.yt-desc').removeClass("hidden");
});
$('#img').click(function(event) {
  togglePostForm("img", "yt", "gm", "text");
  $('.img-desc').removeClass("hidden");
  $('.post-desc').addClass("hidden");
  $('.gm-desc').addClass("hidden");
  $('.yt-desc').addClass("hidden");
});
$('#gm').click(function(event) {
  togglePostForm("gm", "img", "yt", "text");
  $('.post-desc').addClass("hidden");
  $('.gm-desc').removeClass("hidden");
  $('.yt-desc').addClass("hidden");
  $('.img-desc').addClass("hidden");
});
$('#text').click(function(event) {
  togglePostForm("text", "img", "gm", "yt");
  $('.post-desc').removeClass("hidden");
  $('.gm-desc').addClass("hidden");
  $('.yt-desc').addClass("hidden");
  $('.img-desc').addClass("hidden");
});
