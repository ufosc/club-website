const Validator = require("validator");
const isEmpty = require("is-empty");

export default function validateEventCreation(data : any) {
	let errors : any = {};

	data.eventcode = data.eventcode || "";
	data.eventname = data.eventname || "";
	data.starttime = data.starttime || "";
	data.endtime = data.endtime || "";

	if (Validator.isEmpty(data.eventcode))
		errors.email = "Event code is required.";

	if (Validator.isEmpty(data.eventname))
		errors.email = "Event name is required.";

	if (Validator.isISO8601(data.starttime))
		errors.password = "Invalid event start time.";

	if (Validator.isISO8601(data.endtime))
		errors.password = "Invalid event end time.";

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
