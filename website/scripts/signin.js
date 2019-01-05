// HTTP values
const attendanceUrl = "https://api.ufopensource.club/backend/sign-in";
const memberUrl = "https://api.ufopensource.club/backend/member-create";

// HTML elements
const signInForm = document.getElementById("sign-in");
const memberCreateForm = document.getElementById("member-create");
const signInEmail = document.getElementById("sign-in-email");
const memberEmail = document.getElementById("member-email");

// Submit sign in email from sign-in form
function submitSignIn() {
	// Get the email
	let signInData = new FormData(signInForm);

	// Check the email to make sure it's valid
	if (!isEmailValid(signInData.get("ufl_username"))) {
		alert("Email is not a \"@ufl.edu\"");
		return;
	}

	// Send the email
	fetch(attendanceUrl, {
		method: "PUT",
		body: signInData
	})
	.then(response => {
		// Get actual information
		let responseInformation = response.json();

		// Check to see if the response was good
		if (!response.ok || !responseInformation.isBadEmail) {
			throw new Error("Invalid status code");
		}
		console.log("Success:", JSON.stringify(response));

		// Show success if attendance was recorded and if ask for more information if they are a new member
		if (responseInformation.isNewMember) {
			alert("Attendance successfully recorded. Would you like to fill out more information for the club? Note: If you don't want to provide more information, just press \"Send Information\" to stop being prompted.")
		} else {
			// Show success if attendance was recorded and there were an existing member
			alert("Attendance successfully recorded. Enjoy the meeting!");
		}

	})
	// Show alert if failure to connect to server (both if internet problem or 404 type issue)
	.catch(error => {
		console.error("Error:", error);
		alert("Could not connect to the server, please try again later.");
	})
}

// Submit member information from member-create form
function submitCreateNewMember() {
	// Check the email again
	let memberData = new FormData(memberEmail);

	// Check the email to make sure it's valid
	if (!isEmailValid(memberData.get("ufl_username"))) {
		alert("Email is not a \"@ufl.edu\"");
		return;
	}

	// Send the member information
	fetch(memberCreateForm, {
		method: "PUT",
		body: memberData
	})
	.then(response => {
		// Get actual information
		let responseInformation = response.json();

		// Check to see if the response was good
		if (!response.ok || !responseInformation.isBadEmail) {
			throw new Error("Invalid status code");
		}
		console.log("Success:", JSON.stringify(response));

		// Show success
		alert("Information received, thank you!");

	})
	// Show alert if failure to connect to server (both if internet problem or 404 type issue)
	.catch(error => {
		console.error("Error:", error);
		alert("Could not connect to the server, please try again later.");
	})
}


// Switch from the sign in form to the member create form
function switchFormFromSignInToMember() {
	// Hide the sign in and show the member create
	signInForm.style.display = "none";
	memberCreateForm.style.display = "block";

	// Copy the email from the original sign in form
	memberEmail.value = signInEmail.value;
}

// Check if email is a valid @ufl.edu
function isEmailValid(email) {
	const uflDomain = "@ufl.edu";

	// Pass the email if valid else return false
	if (email.endsWith(uflDomain)) {
		return true;
	} else {
		return false;
	}
}
