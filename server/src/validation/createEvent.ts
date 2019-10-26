import isEmpty from 'is-empty';
import Validator from 'validator';
import {User} from "../models/User";
import {Types} from "mongoose";

export default function validateEventCreation(data: any) {
	const errors: any = {};

	data.eventcode = data.eventcode || '';
	data.eventname = data.eventname || '';
	data.starttime = data.starttime || '';
	data.endtime = data.endtime || '';
	data.discord = data.discord || false;
	data.sender = data.sender || '';

	if (Validator.isEmpty(data.sender)) {
		errors.sender = 'Sender is not an admin';
	} else if (data.discord) {
		User.findOne({discord: data.sender}, (err, sender) => {
			if (err)
				errors.sender = 'Sender is not an admin.';
			else if (sender && !sender.admin)
				errors.sender = 'Sender is not an admin.';
			else if (!sender)
				errors.sender = 'Sender is not an admin.';
		}).catch(err => errors.sender = 'Sender is not an admin');
	} else {
		User.findOne({_id: Types.ObjectId(data.sender)}, (err, sender) => {
			if (err)
				errors.sender = 'Sender is not an admin.';
			else if (sender && !sender.admin)
				errors.sender = 'Sender is not an admin.';
			else if (!sender)
				errors.sender = 'Sender is not an admin.';
		}).catch(err => errors.sender = 'Sender is not an admin');
	}

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
