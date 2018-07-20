'use strict';

function loginHandler() {

  $(".submit-login").on('submit', function(event) {

    event.preventDefault();
    const email = $('email').val();
    const password = $('password').val();

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
        console.log(data.authToken);
        localStorage.setItem('token', data.authToken);
      },
      error: function(error) {
        let errorMessage = "Username or Password is incorrect.";
        $('.error-message').html(`${errorMessage}`);
        console.log("error", error);
      }
    };
    
    $.ajax(settings);

  });
}

$(loginHandler);
