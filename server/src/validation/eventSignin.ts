import isEmpty from 'is-empty';
import Validator from 'validator';

export default function validateEventSignInInput(data: any) {
	const errors: any = {};
	data.name = data.name || '';
	data.email = data.email || '';

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Name field is required.';
	}

	if (!Validator.isEmail(data.email)) {
		errors.eventname = 'Please enter a valid eventname address.';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
}
