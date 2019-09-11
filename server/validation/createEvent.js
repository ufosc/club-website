const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateEventCreation(data) {
	let errors = {};

	data.eventcode = data.eventcode || "";
	data.eventname = data.eventname || "";
	data.endtime = data.endtime || "";

	if (Validator.isEmpty(data.eventcode))
		errors.email = "Event code is required.";

	if (Validator.isEmpty(data.eventname))
		errors.email = "Event name is required.";

	if (Validator.isEmpty(data.endtime))
		errors.password = "Event end time is required.";

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
