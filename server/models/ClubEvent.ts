import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

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
	attendees: {
		type: Array,
		default: {}
	}
});

export let ClubEvent: mongoose.Model<any> = mongoose.model("ClubEvent", ClubEventSchema, "clubevents");
