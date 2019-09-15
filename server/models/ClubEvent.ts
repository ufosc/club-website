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

let ClubEvent: mongoose.Model<any>;
module.exports = ClubEvent = mongoose.model("ClubEvent", ClubEventSchema, "clubevents");
