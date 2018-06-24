$(window).on("scroll", function(){
  // alert("works")
  console.log($(window).scrollTop());
  if($(window).scrollTop() > 510){
    $(".home-nav").css("background-color", "#94806A");
  }
  else {
    $(".home-nav").css("background-color", "");
  }
});
