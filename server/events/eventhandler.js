const EventEmitter = require('events');

class ClubEventEmitter extends EventEmitter {}

exports.clubEventEmitter = new ClubEventEmitter();
const ActiveClubEvent = require('../models/ActiveClubEvent');

exports.isClubEventEnabled = () : boolean => {
	return activeEvent !== "";
};

const {activeEvent} = () : String => {
	ActiveClubEvent.find({}, (activeClubEvent) => {
		return activeClubEvent.code.trim();
	})
};

exports.clubEventEmitter.on('enable', (eventCode, eventName, req, res) => {
	setImmediate(() => {
		if (exports.isClubEventEnabled())
			return res.status(400).json({eventActive: "An event is already active."});

		const event = {code: eventCode};
		ActiveClubEvent.updateOne({}, event, {new:  true});

		res.set(200).json({success: true,
		message: `Successfully started new event: ${eventName} with EVENT_CODE ( ${eventCode} )`,

		});
	})
});

clubEventEmitter.on('disable', () => {
	setImmediate(() => {

	});
});
