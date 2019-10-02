import * as mongoose from 'mongoose';
import {ClubEvent} from "./ClubEvent";

const Schema = mongoose.Schema;

// TODO: simplify schema to inherit from ClubEvent schema. Would reduce redundancy.

const ScheduledClubEventsSchema = new Schema({
	events: [{
		type: Object,
		required: true
	}]
});

export let ScheduledClubEvent: mongoose.Model<any>;
module.exports = ScheduledClubEvent = mongoose.model('ScheduledClubEvent', ScheduledClubEventsSchema, 'scheduledclubevents');
