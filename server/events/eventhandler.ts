const EventEmitter = require('events');

class ClubEventEmitter extends EventEmitter {}

exports.clubEventEmitter = new ClubEventEmitter();
const ActiveClubEvent = require('../models/ActiveClubEvent');

exports.isClubEventEnabled = () => {
	return activeEvent !== null && activeEvent !== "" && `${activeEvent}` !== "undefined";
};

const activeEvent = async () => {
	await ActiveClubEvent.collection.find({}, (activeClubEvent: { code: { trim: () => String; }; }) : String => {
		console.log(`active event: ${activeClubEvent.code.trim}`);
		return activeClubEvent.code.trim();
	});
};

exports.clubEventEmitter.on('enable', (eventcode : String, eventname : String, endtime : String, req : any, res : any) => {
	setImmediate(() => {
		console.log("Enabling a new event...");
		const isActive : boolean = exports.isClubEventEnabled();

		if (isActive) {
			console.log(`Event creation failed, '${activeEvent}' is already running.`);
			return res.status(400).json({eventActive: `An event '${activeEvent}' is already active.`});
		}

		const event = {code: eventcode};
		ActiveClubEvent.collection.updateOne({}, event, {new:  true});

		res.set(200).json({success: true,
		message: `Successfully started new event: ${eventname} with EVENT_CODE ( ${eventcode} ).`,
		endtime: `${endtime}`
		});
	})
});

exports.clubEventEmitter.on('disable', () => {
	setImmediate(() => {

	});
});
