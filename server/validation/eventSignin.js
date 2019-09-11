const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateEventSignInInput(data) {
	let errors = {};
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
