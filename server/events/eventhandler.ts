import * as mongoose from "mongoose";

const EventEmitter = require('events');
import * as express from 'express';
import {ClubEventList} from "../utils/clubEventList";

let clubEventList: any = new ClubEventList();

export class ScheduledClubEvent {
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

	public getEventBegin(): Date {
		return this.eventBegin;
	}

	public getEventEnd(): Date {
		return this.eventEnd;
	}

	public getEventCode(): String {
		return this.eventCode;
	}

	public getEventName(): String {
		return this.eventName;
	}

	public async schedule() {
		if (clubEventList.size() > 0) {
			if (clubEventList.size() > 0) {
				return new Promise((resolve, reject) => {
					let val = clubEventList.binaryInsert(this, false, (a: Date, b: Date) => {
						return (a.getDate() < b.getDate() ? -1 : (a.getDate() > b.getDate() ? 1 : 0));
					});
					if (val === -1)
						reject();
					else
						resolve(val);
				});
			}
		}
	}
}

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

clubEventEmitter.on("schedule", (eventCode: String, eventName: String, startTime: Date, endTime: Date, res: express.Response) => {
	setImmediate(async () => {
		let event = new ScheduledClubEvent(startTime, endTime, eventCode, eventName);

		event.schedule().then((val) => {
			res.status(200).json({success: `Successfully scheduled a new event from ${String(startTime)}->${String(endTime)}, with event code ( ${eventCode} ) and with name ${eventName}`});
			return val;
		}).then((val) => {
			const timeDiff = startTime.getTime() - Date.now();
			if (timeDiff < 0) {
				throw new Error("You attempted to schedule an event in the past. No time travelling allowed!");
			} else {
				setTimeout(() => {
					clubEventList.remove(val);
					clubEventEmitter.on('enable', eventCode, eventName, startTime, endTime);
				}, timeDiff);
			}
		}).catch((err) => {
			if (err)
				res.status(400).json({schedulingFailed: `${err}`});
			else
				res.status(400).json({schedulingFailed: `Insertion failed due to overlapping scheduling times. Please verify that you entered the correct date and time combinations for your event.`});
		});
	});
});

clubEventEmitter.on('disable', () => {
	setImmediate(async () => {

	});
});
