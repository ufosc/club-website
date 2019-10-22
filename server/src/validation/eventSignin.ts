import isEmpty from 'is-empty';
import Validator from 'validator';

export default function validateEventSignInInput(data: any) {
	const errors: any = {};
	data.email = data.email || '';

	if (!Validator.isEmail(data.email)) {
		errors.email = 'Please enter a valid email address.';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
}
