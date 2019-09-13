import * as mongoose from "mongoose";

const EventEmitter = require('events');
import * as express from 'express';

let clubEventQueue: Array<ScheduledClubEvent> = [];

class ScheduledClubEvent {
	private eventBegin: Date;
	private eventEnd: Date;
	private eventCode: String;
	private eventName: String;

	constructor(eventBegin, eventEnd, eventCode, eventName) {
		this.eventBegin = eventBegin;
		this.eventEnd = eventEnd;
		this.eventCode = eventCode;
		this.eventName = eventName;
	}

	public schedule() {
	}
}

function ClubEventQueue() {
	this.queue = [];
}

ClubEventQueue.prototype.enqueue = (item: ScheduledClubEvent) => {
	this.queue.push(item);
};

ClubEventQueue.prototype.dequeue = () => {
	return this.queue.shift();
};

ClubEventQueue.prototype.insertAt = (item: ScheduledClubEvent, index) => {
	this.queue.splice(index, 0, item);
};

ClubEventQueue.prototype.size = () => {
	return this.queue.length;
};

ClubEventQueue.prototype.sort = (a: Date, b: Date) => {
	return this.queue.sort(() => {
		return b.getDate() - a.getDate();
	})
};

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

clubEventEmitter.on('enable', (eventCode: String, eventName: String, startTime: Date, endTime: Date, res: express.Response) => {
	setImmediate(async () => {
		console.log("Attempting to enable a new event...");
		const isActive: boolean = await isClubEventEnabled();

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

clubEventEmitter.on('disable', () => {
	setImmediate(async () => {

	});
});
