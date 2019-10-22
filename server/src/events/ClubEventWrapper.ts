import LoopUtils from '../utils/loopUtils';
import {ClubEvent} from '../models/ClubEvent';

/**
 *  @desc Wrapper for JSON event objects.
 * @class Event
 */
export class ClubEventWrapper {
	/**
	 * Return all events within a range of dates.
	 * @param dateBegin the date to begin selection from
	 * @param dateEnd the date to end selection at
	 * @return returns an unsorted list of events within a provided rage
	 */
	public static async getEvents(dateBegin, dateEnd): Promise<ClubEventWrapper[]> {
		const eventList: ClubEventWrapper[] = [];
		await ClubEvent.find(
			{startDate: {$lte: Date.now()}, endDate: {$gte: Date.now()}},
			(err, events) => {
				if (err) {
					console.log(err);
				} else {
					ClubEventWrapper.addEvents(events, eventList);
				}
			}
		);
		return eventList;
	}

	private static addEvents = async (events: any, eventList: ClubEventWrapper[]) => {
		await LoopUtils.asyncForEach(events, async (event) => {
			eventList.push(new ClubEventWrapper(event));
		});
	};

	private readonly code: string = null;
	private readonly name: string = null;
	private readonly startDate: number = null;
	private readonly endDate: number = null;
	private attendees: string[] = [];
	private eventObj: any = null;

	constructor(event: any) {
		if (event) {
			this.code = event.code && (this.code = event.code);
			this.name = event.name && (this.name = event.name);
			this.startDate = event.startDate && (this.startDate = event.startDate);
			this.endDate = event.endDate && (this.endDate = event.endDate);
			this.attendees = event.attendees && (this.attendees = event.attendees);
			this.eventObj = event;
		}
	}

	public toJson(): any {
		return this.eventObj;
	}

	public getCode(): string {
		return this.code;
	}

	public getName(): string {
		return this.name;
	}

	public getStartDate(): number {
		return this.startDate;
	}

	public getEndDate(): number {
		return this.endDate;
	}

	public getAttendees(): string[] {
		return this.attendees;
	}

	public addAttendee(email: string): void {
		ClubEvent.findOneAndUpdate(
			{
				code: this.code,
				attendees: {$ne: email}
			},
			{$addToSet: {attendees: email}},
			(err, results) => {
				if (err)
					console.log(err);
				else if (this.attendees.includes(email))
					this.attendees.push(email);
			}
		);
	}
}
