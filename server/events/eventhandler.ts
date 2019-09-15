import * as mongoose from "mongoose";

const EventEmitter = require('events');
import * as express from 'express';
import {ClubEventList} from "../utils/clubEventList";
import {ScheduledClubEvent} from "../models/ScheduledClubEvents";

let clubEventList = new ClubEventList();

export class ScheduledEvent {
	private readonly eventBegin: Date;
	private readonly eventEnd: Date;
	private readonly eventCode: String;
	private readonly eventName: String;

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
			return new Promise((resolve, reject) => {
				let val = clubEventList.binaryInsert(this, false, (a: Date, b: Date) => {
					return (a < b ? -1 : (a > b ? 1 : 0));
				});
				if (val === -1)
					reject();
				else
					resolve(val);
			});
		} else
			clubEventList.insert(this);
	}

	public static async rescheduleEvents() {
		return new Promise((resolve, reject) => {
			Promise.all([
				ScheduledClubEvent.deleteMany({startDate: {"$lte": Date.now()}}),
				ScheduledClubEvent.find({})
			]).then(results => {
				const [deletions, toSchedule] = results;
				resolve([deletions, toSchedule]); // TODO: HANDLE RESOLVE/REJECT IN APP.TS
			}).catch(err => reject(err));
		});
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

		let eventLength : any = (endTime.getTime() - startTime.getTime()),
			seconds : any = Math.floor((eventLength / 1000) % 60),
			minutes : any = Math.floor((eventLength / (1000 * 60)) % 60),
			hours : any = Math.floor((eventLength / (1000 * 60 * 60)) % 24);

		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;

		res.status(200).json({
			success: true,
			message: `Successfully started new event: ${eventName} with event code ( ${eventCode} ).`,
			starttime: `${startTime}`,
			endtime: `${endTime}`,
			duration: `This event will last for ${hours}h:${minutes}m:${seconds}s`
		});
	})
});

clubEventEmitter.on("schedule", (eventCode: String, eventName: String, startTime: Date, endTime: Date, res: express.Response) => {
	setImmediate(async () => {
		let event = new ScheduledEvent(startTime, endTime, eventCode, eventName);

		event.schedule().then((val) => {
			const timeDiff: number = startTime.getTime() - Date.now();
			const eventLength: number = endTime.getTime() - startTime.getTime();
			if (timeDiff < 0) {
				throw new Error("You attempted to schedule an event in the past. No time travelling allowed!");
			} else {
				if (eventLength <= 0)
					throw new Error("Event times were arranged wrongly, event must start before event end.");
				else {
					// start event when time has been reached
					setTimeout(() => {
						clubEventList.remove(val);
						clubEventEmitter.emit('enable', eventCode, eventName, startTime, endTime, res);

						setTimeout(() => {
							clubEventEmitter.emit('disable', eventCode, eventName);
						}, endTime.getTime() - startTime.getTime());
					}, timeDiff);
				}
			}
		}).catch((err) => {
			if (err) {
				console.log(err);
				res.status(400).json({schedulingFailed: `${err}`});
			} else
				res.status(400).json({schedulingFailed: `Insertion failed due to overlapping scheduling times. Please verify that you entered the correct date and time combinations for your event.`});
		});
	});
});

clubEventEmitter.on('disable', (eventCode, eventName) => {
	setImmediate(async () => {
		await ActiveClubEvent.collection.remove({});
		console.log(`Event with name '${eventName}' ( ${eventCode } ) has ended.`)
	});
});
