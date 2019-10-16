const Validator = require("validator");
const isEmpty = require("is-empty");

export default function validateEventSignInInput(data : any) {
	let errors : any = {};
	data.name = data.name || "";
	data.email = data.email || "";

	if (Validator.isEmpty(data.name))
		errors.name = "Name field is required.";

	if (!Validator.isEmail(data.email))
		errors.email = "Please enter a valid email address.";

	return {
		errors,
		isValid: isEmpty(errors)
	}
};
