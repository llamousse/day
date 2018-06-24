$(window).on("scroll", function(){
  console.log($(window).scrollTop());
  if($(window).scrollTop() > 350){
    $(".home-nav").css("background-color", "#94806A");
  }
  else {
    $(".home-nav").css("background-color", "");
  }
});
