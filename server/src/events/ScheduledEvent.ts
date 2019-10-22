import { ClubEvent } from '../models/ClubEvent';
import { ClubEventList } from '../utils/clubEventList';
import { clubEventEmitter } from './eventhandler';
import {JsonEvent} from "./JsonEvent";

export class ScheduledEvent {
	/**
	 * Function meant for rescheduling and reactivating any active events if server reboots or crashes.
	 * @returns void
	 */
	public static async rescheduleEvents() {
		console.log('Attempting to reschedule events...');
		if (!ClubEvent) {
			console.log('There were no events to reschedule.');
		} else {
			// reschedule all events that have NOT occurred yet
			await ClubEvent.find(
				{ startDate: { $gte: new Date(Date.now()) } },
				(err, events) => {
					if (err) {
						console.log(err);
					} else {
						console.log(`Rescheduling ${events.length} events now!`);
						events.forEach((event: any) => {
							console.log(`Rescheduling event: ${event.code}`);
							clubEventEmitter.emit(
								'schedule',
								event.code,
								event.name,
								new Date(event.startDate),
								new Date(event.endDate), true);
							}
						);

						this.getActiveEvent().then((activeEvent: JsonEvent) => {
							clubEventEmitter.emit(
								'enable',
								activeEvent.getCode(),
								activeEvent.getName(),
								new Date(activeEvent.getStartDate()),
								new Date(activeEvent.getEndDate())
							);
						}).catch((err) => {
							if (err)
								console.log(err);
							else
								console.log('No events to re-enable!');
						});
					}
				}
			);
			// reactivate ACTIVE event (only one active event may occur at a time)

		}
	}

	public static async getActiveEvent() : Promise<JsonEvent> {
		let evt = null;
		await ClubEvent.findOne(
			{
				startDate: { $lte: Date.now() },
				endDate: { $gt: Date.now() }
			},
			(err, event: any) => {
				if (err) {
					console.log(err);
				}
				evt = new JsonEvent(event);
			}
		);

		return evt;
	}

	/**
	 * Clears all of the scheduled events from the scheduler.
	 */
	public static async clear() {
		ClubEventList.clear();
	}

	private readonly eventBegin: Date;
	private readonly eventEnd: Date;
	private readonly eventCode: string;
	private readonly eventName: string;

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

	public getEventCode(): string {
		return this.eventCode;
	}

	public getEventName(): string {
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
				const val = ClubEventList.binaryInsert(
					this,
					false,
					(a: Date, b: Date) => {
						return a < b ? -1 : a > b ? 1 : 0;
					}
				);
				if (val === -1) {
					reject();
				} else {
					resolve(val);
				}
			});
		} else {
			ClubEventList.insert(this);
		}
	}
}
