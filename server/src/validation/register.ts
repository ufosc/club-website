const Validator = require("validator");
const isEmpty = require("is-empty");

export default function validateRegisterInput(data : any) {
	let errors : any = {};
	data.name = !isEmpty(data.name) ? data.name : "";
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";
	data.password2 = !isEmpty(data.password2) ? data.password2 : "";

	// validate name field
	if (Validator.isEmpty(data.name))
		errors.name = "Name field is required.";

	// validate email field
	if (Validator.isEmpty(data.email))
		errors.email = "Email field is required.";
	else if (!Validator.isEmail(data.email))
		errors.email = "Please enter a valid email address.";

	// validate password field
	if (Validator.isEmpty(data.password))
		errors.password = "Password field is required.";

	// validate password confirmation
	if (Validator.isEmpty(data.password2))
		errors.password2 = "Confirm password field is required.";

	// validate password length
	if (!Validator.isLength(data.password, {min: 8, max: 30}))
		errors.password = "Password must be at least 8 characters.";

	// validate password and password confirmation strings match
	if (!Validator.equals(data.password, data.password2))
		errors.password2 = "Your passwords do not match.";

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
