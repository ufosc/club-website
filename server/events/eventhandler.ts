const EventEmitter = require('events');
import * as express from 'express';
import {ClubEventList} from "../utils/clubEventList";
import {ClubEvent} from "../models/ClubEvent";
import LoopUtils from "../utils/loopUtils";

class ClubEventEmitter extends EventEmitter {
}

export const clubEventEmitter = new ClubEventEmitter();

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

	/**
	 * Schedules an event using an automatically sorted (by insertion) list.
	 * @see ClubEventList
	 * @return returns a promise that tells whether or not an event was able to be scheduled.
	 */
	public async schedule() {
		if (ClubEventList.size() > 0) {
			return new Promise((resolve, reject) => {
				const val = ClubEventList.binaryInsert(this, false, (a: Date, b: Date) => {
					return (a < b ? -1 : (a > b ? 1 : 0));
				});
				if (val === -1)
					reject();
				else
					resolve(val);
			});
		} else
			ClubEventList.insert(this);
	}

	/**
	 * Function meant for rescheduling and reactivating any active events if server reboots or crashes.
	 * @returns void
	 */
	public static async rescheduleEvents() {
		console.log('Rescheduling events...');
		if (!ClubEvent)
			console.log('There were no events to reschedule.');
		else {
			// reschedule all events that have NOT occurred yet
			await ClubEvent.find({startDate: {'$gte': Date.now()}}, (err, events) => {
				if (err)
					console.log(err);
				else
					events.forEach((event: any) => clubEventEmitter.emit('schedule', event.code, event.name, new Date(event.startDate), new Date(event.endDate)));
			});
			// reactivate ACTIVE event (only one active event may occur at a time)
			await ClubEvent.findOne({startDate: {'$lte': Date.now()}, endDate: {'$gt': Date.now()}}, (err, event: any) => {
				if (err)
					console.log(err);
				else if (event)
					clubEventEmitter.emit('enable', event.code, event.name, new Date(event.startDate), new Date(event.endDate))

			})
		}
	}

	/**
	 * Clears all of the scheduled events from the scheduler.
	 */
	public static async clear() {
		ClubEventList.clear();
	}
}

/**
 *  @desc Wrapper for JSON event objects.
 * @class Event
 */
class Event {
	private readonly code: String = null;
	private readonly name: String = null;
	private readonly startDate: number = null;
	private readonly endDate: number = null;
	private attendees: String[] = [];
	private eventObj: any = null;

	constructor(event: any) {
		this.code = event.code;
		this.name = event.name;
		this.startDate = event.startDate;
		this.endDate = event.endDate;
		this.attendees = event.attendees;
		this.eventObj = event;
	}

	public getCode(): String {
		return this.code;
	}

	public getName(): String {
		return this.name;
	}

	public getStartDate(): number {
		return this.startDate;
	}

	public getEndDate(): number {
		return this.endDate;
	}

	public getAttendees(): String[] {
		return this.attendees;
	}

	public addAttendee(email: String): void {
		ClubEvent.findOneAndUpdate({code: this.code, attendees: {$ne: email}}, {$addToSet: {attendees: email}}, (err, results) => {
			if (results)
				this.attendees.push(email);
		});
	}

	private static addEvents = async (events: any, eventList: Event[]) => {
		await LoopUtils.asyncForEach(events, async (event) => {
			eventList.push(new Event(event))
		});
	};

	/**
	 * Return all events within a range of dates.
	 * @param dateBegin the date to begin selection from
	 * @param dateEnd the date to end selection at
	 * @return returns an unsorted list of events within a provided rage
	 */
	public static async getEvents(dateBegin, dateEnd): Promise<Event[]> {
		const eventList: Event[] = [];
		await ClubEvent.find({startDate: {$lte: Date.now()}, endDate: {$gte: Date.now()}}, (err, events) => {
			if (err)
				console.log(err);
			else
				Event.addEvents(events, eventList);
		});
		return eventList;
	}
}

let activeEvent = null;

clubEventEmitter.on('enable', (eventCode: String, eventName: String, startTime: Date, endTime: Date, res?: express.Response) => {
	setImmediate(async () => {
		console.log("Attempting to enable a new event...");

		if (activeEvent) {
			console.log(`Event creation failed, event with code '${activeEvent.code}' is already running.`);
			return res.status(400).json({eventActive: `An event with code: '${activeEvent.code}', is already active.`});
		}

	})
});

clubEventEmitter.on('schedule', (eventCode: String, eventName: String, startTime: Date, endTime: Date, res?: express.Response) => {
	setImmediate(async () => {
		let event = new ScheduledEvent(startTime, endTime, eventCode, eventName);

		const evt: any = {
			'code': eventCode,
			'name': eventName,
			'startDate': startTime.getTime(),
			'endDate': endTime.getTime()
		};
		await ClubEvent.updateOne({code: evt.code}, {}, {upsert: true}, (err, result) => {
			// if the event does not exist
			if (~result.n) {
				event.schedule().then((val: number) => {
					const timeDiff: number = startTime.getTime() - Date.now();
					const eventLength: number = endTime.getTime() - startTime.getTime();
					if (timeDiff < 0) {
						throw new Error("You attempted to schedule an event in the past. No time travelling allowed!");
					} else {
						if (eventLength <= 0)
							throw new Error("Event times were arranged wrongly, event must start before event end.");
						else {
							// start event when start time has been reached
							setTimeout(() => {
								ClubEventList.remove(val);
								let seconds: any = Math.floor((eventLength / 1000) % 60),
									minutes: any = Math.floor((eventLength / (1000 * 60)) % 60),
									hours: any = Math.floor((eventLength / (1000 * 60 * 60)) % 24);

								hours = (hours < 10) ? "0" + hours : hours;
								minutes = (minutes < 10) ? "0" + minutes : minutes;
								seconds = (seconds < 10) ? "0" + seconds : seconds;
								if (res)
									res.status(200).json({
										success: true,
										message: `Successfully started new event: ${eventName} with event code ( ${eventCode} ).`,
										starttime: startTime,
										endtime: endTime,
										duration: `This event will last for ${hours}h:${minutes}m:${seconds}s`
									});

								console.log(`Successfully started new event: ${eventName} with event code ( ${eventCode} ).\n\nThis event will last for ${hours}h:${minutes}m:${seconds}s`);

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
						if (res)
							res.status(400).json({schedulingFailed: err});
					} else {
						if (res)
							res.status(400).json({schedulingFailed: `Insertion failed due to overlapping schedule times. Please verify that you entered the correct date and time combinations for your event.`});
					}
				});
			} else {
				if (res)
					res.status(400).json({schedulingFailed: `Event with code ${eventCode} already exists. Please specify a unique event code.`})
			}
		});
	});
});

clubEventEmitter.on('disable', (eventCode, eventName) => {
	setImmediate(async () => {
		console.log(`Event with name '${eventName}' ( ${eventCode} ) has ended.`);
		activeEvent = null;
	});
});
