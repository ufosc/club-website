import * as mongoose from "mongoose";

const EventEmitter = require('events');
import * as express from 'express';

class ClubEventEmitter extends EventEmitter {
}

export const clubEventEmitter = new ClubEventEmitter();
const ActiveClubEvent: mongoose.Model<any> = require('../models/ActiveClubEvent');

let activeEventCode = "";

export const isClubEventEnabled = async () => {
	let isActive = false;
	await activeEvent().then((eventCode: any) => {
		eventCode = String(eventCode).trim();
		isActive = eventCode !== null && eventCode !== "" && eventCode != "null";
		if (isActive)
			activeEventCode = eventCode;
	}).catch((err) => {
		console.log(err);
		isActive = true;
	});
	return isActive;
};

const activeEvent = async () => {
	return new Promise((resolve: any, reject) => {
		ActiveClubEvent.findOne({}, (err: any, activeClubEvent: any) => {
			if (err)
				reject(err);
			else
				resolve(activeClubEvent && activeClubEvent.code || "");
		})
	});
};

clubEventEmitter.on('enable', (eventCode: String, eventName: String, endTime: String, res: express.Response) => {
	setImmediate(async () => {
		console.log("Enabling a new event...");
		const isActive: boolean = await isClubEventEnabled();
		console.log('result in variable: ' + isActive);

		if (isActive) {
			console.log(`Event creation failed, event with code '${activeEventCode}' is already running.`);
			return res.status(400).json({eventActive: `An event with code: '${activeEventCode}', is already active.`});
		}

		const event = {code: eventCode};
		ActiveClubEvent.collection.insertOne(event);

		res.status(200).json({
			success: true,
			message: `Successfully started new event: ${eventName} with event code ( ${eventCode} ).`,
			endtime: `${endTime}`
		});
	})
});

module.exports.clubEventEmitter.on('disable', () => {
	setImmediate(() => {

	});
});
