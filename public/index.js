var state = {
  token: "",
  type: "text"
};

// When you load the doc, get the posts
$(function() {
  state.token = localStorage.getItem("token");
  if (state.token) {
    loggedIn();
  }
});

function getId(url) {
  var video_id = url.split("v=")[1];
  var ampersandPosition = video_id.indexOf("&");
  if (ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
  }
  return video_id;
}

function dateParser(date) {
  date = new Date(date);

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return date.toLocaleDateString("en-US", options);
}

// SIGN UP / LOG IN-OUT
$(".submit-signup").on("click", function(event) {
  event.preventDefault();

  const firstName = $("#firstname").val();
  const lastName = $("#lastname").val();
  const email = $("#email").val();
  const password = $("#password").val();

  const settings = {
    url: "/api/users",
    data: JSON.stringify({
      email,
      password,
      firstName,
      lastName
    }),
    dataType: "json",
    contentType: "application/json",
    type: "POST",
    success: function(data) {
      toggleForm("login", "signup");
    },
    error: function(error) {
      let errorLocation = error.responseJSON.location;
      let errorMessage = error.responseJSON.message;
      $(".signup-error").html(`Error: ${errorLocation}: ${errorMessage}`);
      console.log("error", error);
    }
  };

  $.ajax(settings);
});

$(".submit-login").on("click", function(event) {
  event.preventDefault();
  const email = $("#login-email").val();
  const password = $("#login-password").val();

  const settings = {
    url: "/api/auth/login",
    data: JSON.stringify({
      email,
      password
    }),
    dataType: "json",
    contentType: "application/json",
    type: "POST",
    success: function(data) {
      localStorage.setItem("token", data.authToken);
      state.token = data.authToken;
      loggedIn();
    },
    error: function(error) {
      let errorMessage = "Email or Password is incorrect.";
      $(".login-error").html(`${errorMessage}`);
      console.log("error", error);
    }
  };

  $.ajax(settings);
});

$("#logout").click(function(event) {
  localStorage.setItem("token", "");
  state.token = "";
  loggedOut();
});

// When user fills the form and sends, create a post
$("#submit-post").click(function(event) {
  postDataToApi();
  $(".post-field").val("");
});

// GET DATA / POST DATA API

function postDataToApi() {
  var datePickerVal = $("#p-date").val();
  var post = {
    title: $("#p-title").val(),
    date: new Date(datePickerVal + " 0:0:0"),
    description: $("#p-desc").val(),
    type: state.type
  };

  if (state.type === "text") {
    post.description = $("#p-desc").val();
  } else if (state.type === "video") {
    post.video_url = getId($("#yt-desc").val());
  } else if (state.type === "image") {
    post.image_url = $("#img-desc").val();
  } else {
    post.location = {
      lat: $("#gm-lat").val(),
      lng: $("#gm-lng").val()
    };
  }

  const settings = {
    url: "/api/posts",
    data: JSON.stringify(post),
    dataType: "json",
    contentType: "application/json",
    type: "POST",
    headers: {
      Authorization: `Bearer ${state.token}`
    },
    success: function(data) {
      getDataFromApi();
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
    headers: {
      Authorization: `Bearer ${state.token}`
    },
    success: function(data) {
      displayPostData(data);
    },
    error: function(error) {
      console.log("error", error);
    }
  };
  $.ajax(settings);
}

// DISPLAY AND RENDER POSTS

function displayPostData(data) {
  var results = data.map((post, index) => {
    return renderResult(post, index);
  });

  if (results.length > 0) {
    $(".posts").html(results);
  } else {
    $(".posts").html(
      `<h2 class="first-post">Welcome to Day! Submit your first post to start building your journal.</h2>`
    );
    $(".first-post").css("height", "540px");
    $(".first-post").css("padding", "50px 15px 0px 15px");
  }
}

function renderResult(post, index) {
  let postHTML = `
  <div class="post-content" data-index="${index}">
  <h1>${post.title}</h1>
  <h2>${dateParser(post.date)}</h2>
  `;

  if (post.type === "text") {
    postHTML += `<p>${post.description}</p>`;
  } else if (post.type === "image") {
    postHTML += ` <img src="${post.image_url}" max-width="500" height="300"/>`;
  } else if (post.type === "video") {
    postHTML += `
    <iframe width="560" height="315"
    src="https://www.youtube.com/embed/${post.video_url}"
    frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
    `;
  } else if (post.type === "maps") {
    postHTML += `
      <iframe
      width="560"
      height="315"
      frameborder="0"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
      src="https://maps.google.com/maps?q=${post.location.lat},
      ${post.location.lng}&hl=es;z=8&amp;output=embed">
      </iframe>
      <br />

      <small>
      <a href="https://maps.google.com/maps?q=${post.location.lat},
      ${post.location.lng}&hl=es;z=8&amp;output=embed"
      style="color:#0000FF;text-align:left"
      target="_blank">
      </a>
      </small>


    `;
  }
  postHTML += "    <hr> </div>";
  return postHTML;
}

// EVENT LISTENER FUNCTIONS

$(window).on("scroll", function() {
  if ($(window).scrollTop() > 300) {
    $(".home-nav").css("background-color", "#94806A");
  } else {
    $(".home-nav").css("background-color", "");
  }
});

function toggleForm(form1, form2) {
  $(`#${form1}`).css("background-color", "#B0E2F8");
  $(`#${form2}`).css("background-color", "#ffffff");
  $(`#${form1}-form`).show();
  $(`#${form2}-form`).hide();
}

function highlightType(highlight) {
  $(".post-option-type").css("background-color", "#ffffff");
  $(`#${highlight}`).css("background-color", "#B0E2F8");
}

function sideBarMenu() {
  $(".sidebar-bg").toggleClass("hidden");
  $(".sidebar-top").toggleClass("hidden");

  $(".sidebar-button").click(function(event) {
    $(".sidebar-bg").addClass("hidden");
    $(".sidebar-top").addClass("hidden");
  });
}

function loggedIn() {
  getDataFromApi();
  $(".posts").removeClass("hidden");
  $(".sidebar-bg").addClass("hidden");
  $(".display-start").addClass("hidden");
  $(".rectangle").addClass("hidden");
  $(".about-section").addClass("hidden");
  $(".bg-journal").removeClass("hidden");
  $(".post-display").removeClass("hidden");
  $("#text").css("background-color", "#B0E2F8");

  $(".home-nav").on("click", ".sidebar-menu", function(event) {
    event.preventDefault();
    $(".sidebar-button").hide();
    $(".jsidebar-button").show();
  });

  $(".jsidebar-button").click(function(event) {
    $(".sidebar-bg").addClass("hidden");
    $(".sidebar-top").addClass("hidden");
  });
}

function loggedOut() {
  $(".posts").addClass("hidden");
  $(".sidebar-bg").toggleClass("hidden");
  $(".display-start").removeClass("hidden");
  $(".rectangle").removeClass("hidden");
  $(".about-section").removeClass("hidden");
  $(".bg-journal").addClass("hidden");

  $(".home-nav").on("click", ".sidebar-menu", function(event) {
    event.preventDefault();
    $(".sidebar-button").show();
    $(".jsidebar-button").hide();
  });

  $(".jsidebar-button").click(function(event) {
    $(".sidebar-bg").addClass("hidden");
    $(".sidebar-top").addClass("hidden");
  });

  $(".sidebar-bg").toggleClass("hidden");
  $(".jsidebar-button").addClass("hidden");
  $(".sidebar-button").toggleClass("hidden");
}

$(".home-nav").on("click", ".sidebar-menu", function(event) {
  event.preventDefault();
  sideBarMenu();
});

$(".rectangle").on("click", ".login", function(event) {
  toggleForm("login", "signup");
});

$(".rectangle").on("click", ".signup", function(event) {
  toggleForm("signup", "login");
});

$("#sidebar-login").click(function(event) {
  toggleForm("login", "signup");
});

$("#sidebar-signup").click(function(event) {
  toggleForm("signup", "login");
});

$("#yt").click(function(event) {
  highlightType("yt");
  state.type = "video";
  $(".optional-field").addClass("hidden");
  $("#yt-desc").removeClass("hidden");
});

$("#img").click(function(event) {
  highlightType("img");
  state.type = "image";
  $(".optional-field").addClass("hidden");
  $("#img-desc").removeClass("hidden");
});

$("#gm").click(function(event) {
  highlightType("gm");
  state.type = "maps";
  $(".optional-field").addClass("hidden");
  $("#gm-lat").removeClass("hidden");
  $("#gm-lng").removeClass("hidden");
});

$("#text").click(function(event) {
  highlightType("text");
  state.type = "text";
  $(".optional-field").addClass("hidden");
  $("#p-desc").removeClass("hidden");
});
