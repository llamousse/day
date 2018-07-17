var state = {
  type: "text"
}

// When you load the doc, get the posts
$(function() {
  getDataFromApi();
});

// When someone fills the form and sends, create a post
$("#submit-post").click(function(event) {
  postDataToApi();
  document.getElementById("p-title").value = "";
  document.getElementById("p-date").value = "";
  document.getElementById("p-desc").value = "";
});

function postDataToApi() {

  var post = {
    title: $('#p-title').val(),
    date: $("#p-date").val(),
    description: $("#p-desc").val(),
    type: state.type
  };

  if (state.type === "text") {
    post.description = $("#p-desc").val();
  }
  else if (state.type === "video") {
    post.video_url = $("#yt-desc").val();
  }
  else if (state.type === "image") {
    post.image_url = $("#img-desc").val();
  }
  else {
    post.location = {
        lat: $("#gm-lat").val(),
        lng: $("#gm-lng").val()
    }
  }

  console.log(post);

  const settings = {
    url: "/api/posts",
    data: JSON.stringify(post),
    dataType: "json",
    contentType: "application/json",
    type: "POST",
    success: function(data) {
      console.log(data);
      displayPostData(data);
    },
    error: function(error) {
      console.log("error", error);
    }
  };
  $.ajax(settings);
}

function getDataFromApi() {
  const settings = {
    url: "/api/posts",
    dataType: "json",
    type: "GET",
    success: function(data) {
      console.log(data);
      displayPostData(data);
    },
    error: function(error) {
      console.log("error", error);
    }
  };
  $.ajax(settings);
}

function displayPostData(data) {
  var results = data.map((post, index) => {
    return renderResult(post, index);
  });

  if (results.length > 0) {
    $(".posts").html(results);
  } else {
    $(".posts").html(`<h2>No results found.</h2>`);
  }
}

function renderResult(post, index) {

  if (`${post.image_url}` !== "") {
    return `
        <div class="post-content" data-index="${index}">
          <h1>${post.date}</h1>
          <h2>${post.title}</h2>
          <img src="${post.image_url}" width="300" height="300"/>
        </div>
        `;
  // }
  // else if (state.type === "image") {
  //   return `
  //       <div class="post-content" data-index="${index}">
  //         <h1>${post.date}</h1>
  //         <h2>${post.title}</h2>
  //         <img src="${post.image_url}" width="300" height="300"/>
  //       </div>
  //       `;
  }
  else if (`${post.description}` !== "") {
    // if (state.type === "text") {
      return `
          <div class="post-content" data-index="${index}">
            <h1>${post.date}</h1>
            <h2>${post.title}</h2>
            <p>${post.description}</p>
          </div>
          `;
    // }
    // else {
    //   return `
    //       <div class="post-content" data-index="${index}">
    //         <h1>${post.date}</h1>
    //         <h2>${post.title}</h2>
    //         <p>${post.description}</p>
    //       </div>
    //       `;
    // }
  }
  // else if (state.type === "text") {
  //   return `
  //       <div class="post-content" data-index="${index}">
  //         <h1>${post.date}</h1>
  //         <h2>${post.title}</h2>
  //         <p>${post.description}</p>
  //       </div>
  //       `;
  // }
  else if (`${post.video_url}` !== "") {
    return `
        <div class="post-content" data-index="${index}">
          <h1>${post.date}</h1>
          <h2>${post.title}</h2>
          <p>${post.video_url}</p>
        </div>
        `;
  }
  // else if (state.type === "video") {
  //   return `
  //       <div class="post-content" data-index="${index}">
  //         <h1>${post.date}</h1>
  //         <h2>${post.title}</h2>
  //         <p>${post.video_url}</p>
  //       </div>
  //       `;
  // }
  else if (`${post.location.lon}` && `${post.location.lng}` !== "") {
    return `
        <div class="post-content" data-index="${index}">
          <h1>${post.date}</h1>
          <h2>${post.title}</h2>
          <iframe
            width="560"
            height="315"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="https://maps.google.com/maps?q=${post.location.lat},${post.location.lng}&hl=es;z=14&amp;output=embed">
           </iframe>
           <br />
           <small>
             <a href="https://maps.google.com/maps?q=${post.location.lat},${post.location.lng}&hl=es;z=14&amp;output=embed"
              style="color:#0000FF;text-align:left"
              target="_blank"></a>
           </small>
        `;
  }
  // else if (state.type === "location") {
  //   return `
  //       <div class="post-content" data-index="${index}">
  //         <h1>${post.date}</h1>
  //         <h2>${post.title}</h2>
  //         <iframe
  //           width="560"
  //           height="315"
  //           frameborder="0"
  //           scrolling="no"
  //           marginheight="0"
  //           marginwidth="0"
  //           src="https://maps.google.com/maps?q=${post.location.lat},${post.location.lng}&hl=es;z=14&amp;output=embed">
  //          </iframe>
  //          <br />
  //          <small>
  //            <a href="https://maps.google.com/maps?q=${post.location.lat},${post.location.lng}&hl=es;z=14&amp;output=embed"
  //             style="color:#0000FF;text-align:left"
  //             target="_blank"></a>
  //          </small>
  //       `;
  // }
}

// NEED IF ELSE + EMBED LINKS
// if (state.type === "image") {
//   return `
//     <div class="post-content" data-index="${index}">
//       <h1>${post.date}</h1>
//       <h2>${post.title}</h2>
//       <img src="${post.image_url}"/>
//     </div>
//     `;
// }
// else if (state.type === "video") {
//   return `
//     <div class="post-content" data-index="${index}">
//       <h1>${post.date}</h1>
//       <h2>${post.title}</h2>
//       <video width="320" height="240" controls>
//         <source src="${post.video_url}">
//       </video>
//     </div>
//     `;
// }

///////////////////////////////////////////////////////////////////////////////

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
  $('.posts').removeClass("hidden");
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
  $('.posts').addClass("hidden");
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

///////////////////////////////////////////////////////////////////////////////

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
  state.type = "video";
  $('.img-desc').addClass("hidden");
  $('.post-desc').addClass("hidden");
  $('.gm-desc-lat').addClass("hidden");
  $('.gm-desc-lng').addClass("hidden");
  $('.yt-desc').removeClass("hidden");
});
$('#img').click(function(event) {
  togglePostForm("img", "yt", "gm", "text");
  state.type = "image";
  $('.img-desc').removeClass("hidden");
  $('.post-desc').addClass("hidden");
  $('.gm-desc-lat').addClass("hidden");
  $('.gm-desc-lng').addClass("hidden");
  $('.yt-desc').addClass("hidden");
});
$('#gm').click(function(event) {
  togglePostForm("gm", "img", "yt", "text");
  state.type = "maps";
  $('.post-desc').addClass("hidden");
  $('.gm-desc-lat').removeClass("hidden");
  $('.gm-desc-lng').removeClass("hidden");
  $('.yt-desc').addClass("hidden");
  $('.img-desc').addClass("hidden");
});
$('#text').click(function(event) {
  togglePostForm("text", "img", "gm", "yt");
  state.type = "text";
  $('.post-desc').removeClass("hidden");
  $('.gm-desc-lat').addClass("hidden");
  $('.gm-desc-lng').addClass("hidden");
  $('.yt-desc').addClass("hidden");
  $('.img-desc').addClass("hidden");
});
