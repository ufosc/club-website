import * as mongoose from 'mongoose';
import {ClubEventSchema} from "./ClubEvent";

const Schema = mongoose.Schema;

const ScheduledClubEventsSchema = new Schema({
	events: [{
		type: ClubEventSchema,
		required: true
	}]
});

export let ScheduledClubEvent : mongoose.Model<any>;
module.exports = ScheduledClubEvent = mongoose.model('ScheduledClubEvent', ScheduledClubEventsSchema, 'scheduledclubevents');
