import EventEmitter from 'events';
import express from 'express';
import {ClubEvent} from '../models/ClubEvent';
import {ClubEventList} from '../utils/clubEventList';
import { ScheduledEvent } from './ScheduledEvent';

class ClubEventEmitter extends EventEmitter {
}

export const clubEventEmitter = new ClubEventEmitter();

let activeEvent = null;

// tslint:disable: max-line-length
clubEventEmitter.on('enable', (eventCode: string, eventName: string, startTime: Date, endTime: Date, res?: express.Response) => {
	setImmediate(async () => {
		console.log('Attempting to enable a new event...');

		if (activeEvent) {
			console.log(`Event creation failed, event with code '${activeEvent.code}' is already running.`);
			return res.status(400).json({eventActive: `An event with code: '${activeEvent.code}', is already active.`});
		}

	});
});

clubEventEmitter.on('schedule', (eventCode: string, eventName: string, startTime: Date, endTime: Date, res?: express.Response) => {
	setImmediate(async () => {
		const event = new ScheduledEvent(startTime, endTime, eventCode, eventName);

		const evt: any = {
			code: eventCode,
			name: eventName,
			startDate: startTime.getTime(),
			endDate: endTime.getTime()
		};
		await ClubEvent.updateOne({code: evt.code}, {}, {upsert: true}, (err, result) => {
			// if the event does not exist
			if (~result.n) {
				event.schedule().then((val: number) => {
					const timeDiff: number = startTime.getTime() - Date.now();
					const eventLength: number = endTime.getTime() - startTime.getTime();
					if (timeDiff < 0) {
						throw new Error('You attempted to schedule an event in the past. No time travelling allowed!');
					} else {
						if (eventLength <= 0) {
							throw new Error('Event times were arranged wrongly, event must start before event end.');
						} else {
							// start event when start time has been reached
							setTimeout(() => {
								ClubEventList.remove(val);
								let seconds: any = Math.floor((eventLength / 1000) % 60);
								let minutes: any = Math.floor((eventLength / (1000 * 60)) % 60);
								let hours: any = Math.floor((eventLength / (1000 * 60 * 60)) % 24);

								hours = (hours < 10) ? '0' + hours : hours;
								minutes = (minutes < 10) ? '0' + minutes : minutes;
								seconds = (seconds < 10) ? '0' + seconds : seconds;
								if (res) {
									res.status(200).json({
										success: true,
										message: `Successfully started new event: ${eventName} with event code ( ${eventCode} ).`,
										starttime: startTime,
										endtime: endTime,
										duration: `This event will last for ${hours}h:${minutes}m:${seconds}s`
									});
								}

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
						if (res) {
							res.status(400).json({schedulingFailed: err});
						}
					} else {
						if (res) {
							res.status(400).json({schedulingFailed: `Insertion failed due to overlapping schedule times. Please verify that you entered the correct date and time combinations for your event.`});
						}
					}
				});
			} else {
				if (res) {
					res.status(400).json({schedulingFailed: `Event with code ${eventCode} already exists. Please specify a unique event code.`});
				}
			}
		});
	});
});

export const isClubEventEnabled = () => {
	return false;
};

clubEventEmitter.on('disable', (eventCode, eventName) => {
	setImmediate(async () => {
		console.log(`Event with name '${eventName}' ( ${eventCode} ) has ended.`);
		activeEvent = null;
	});
});