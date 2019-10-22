import isEmpty from 'is-empty';
import Validator from 'validator';

export default function validateEventCreation(data: any) {
	const errors: any = {};

	data.eventcode = data.eventcode || '';
	data.eventname = data.eventname || '';
	data.starttime = data.starttime || '';
	data.endtime = data.endtime || '';

	if (Validator.isEmpty(data.eventcode)) {
		errors.eventcode = 'Event code is required.';
	}

	if (Validator.isEmpty(data.eventname)) {
		errors.eventname = 'Event name is required.';
	}

	if (!Validator.isISO8601(data.starttime)) {
		errors.starttime = 'Invalid event start time.';
	}

	if (!Validator.isISO8601(data.endtime)) {
		errors.endtime = 'Invalid event end time.';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
}
