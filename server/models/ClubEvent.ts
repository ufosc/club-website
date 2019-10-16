import {Schema, model} from 'mongoose';

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
		default: Date.now,
		required: true
	},
	endDate: {
		type: Date,
		default: Date.now,
		required: true
	},
	attendees: [String]
});

export let ClubEvent = model("ClubEvent", ClubEventSchema, "clubevents");
