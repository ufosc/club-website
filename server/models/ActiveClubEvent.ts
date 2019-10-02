import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ActiveClubEventSchema = new Schema({
	code: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	}
});

let ActiveClubEvent : mongoose.Model<any>;
module.exports = ActiveClubEvent = mongoose.model('ActiveClubEvent', ActiveClubEventSchema, "activeclubevents");
