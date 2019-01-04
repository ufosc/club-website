var expandedForm;
function signInHandler() {
	var uemail = document.getElementById("email").value;
	//eventually this line should replace "Jonathan" with a reference to the name the person signed up with.
	//TODO: actually count the sign-in
	if(uemail == "jperitz@ufl.edu" || Boolean(expandedForm)) {
		document.getElementById("sign-in form").reset();
		alert("Thanks Jonathan, your sign-in was successful!");
	}
	//if the email doesn't match the DB, unhide the extra fields
	else if(uemail != "jperitz@ufl.edu") {
		var x = document.getElementsByClassName("hiddenField");
		expandedForm = true;
		for (var i =0; i < x.length; i++) {
			x[i].style.display = "block";
		}
	}
	//the following line should only get executed if some error occurred.
	else {
		alert("Oops! Something went wrong. Please try again.");
	}
}
