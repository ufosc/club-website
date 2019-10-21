import {model, Schema} from 'mongoose';

// create schema
export const ClubEventSchema = new Schema({
	code: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	startDate: {
		type: Date,
		required: true
	},
	endDate: {
		type: Date,
		required: true
	},
	attendees: [String]
});

export const ClubEvent = model('ClubEvent', ClubEventSchema, 'clubevents');
