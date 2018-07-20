'use strict';

function signupHandle() {
	$('#submit-signup').on('submit', function(event) {

		event.preventDefault();

		const firstName = $('#firstname').val();
		const lastName = $('#lastname').val();
		const email = $('#email').val();
		const password = $('#password').val();

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
        alert('Success! Please log in.');


      },
			error: function(error) {
				let errorLocation = error.responseJSON.location;
				let errorMessage = error.responseJSON.message;
				$('.error-message').html(`Error: ${errorLocation}: ${errorMessage}`);
				console.log('error', error);
			}
		};

    $.ajax(settings);

	});
}


$(signupHandle);
