import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create schema
const ClubEventSchema = new Schema({
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
		default: Date.now
	},
	endDate: {

	},
	attendees: {
		type: Array,
		default: {}
	}
});

let ClubEvent: mongoose.Model<any>;
module.exports = ClubEvent = mongoose.model("ClubEvent", ClubEventSchema, "clubevents");
