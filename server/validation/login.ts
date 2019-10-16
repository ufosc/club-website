const Validator = require("validator");
const isEmpty = require("is-empty");

export default function validateLoginInput(data : any) {
	let errors : any = {};

	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";

	if (Validator.isEmpty(data.email))
		errors.email = "Email field is required.";
	else if (!Validator.isEmail(data.email))
		errors.email = "Email is invalid.";

	if (Validator.isEmpty(data.password))
		errors.password = "Password field is required.";

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
