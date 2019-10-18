import {ScheduledEvent} from "../events/eventhandler";

/**
 * This util provides an ordered list implementation that maintains order upon insertion.
 * Insertion is done by using a binary search and insertion so that order is maintained.
 * @constructor The default constructor.
 */

export class ClubEventList {
	private static list = [];

	static size(): number {
		console.log(ClubEventList.list.length);
		return ClubEventList.list.length;
	}

	static clear(): void {
		ClubEventList.list = [];
	}

	/**
	 @param target the object to insert into the array
	 @param duplicate (optional) whether to insert the object into the array even if a matching object already exists in the array (false by default)
	 @param comparator (optional) a method for comparing the target object type
	 @return the index where the object was inserted into the array, or the index of a matching object in the array if a match was found and the duplicate parameter was false
	 */
	static binaryInsert(target: ScheduledEvent, duplicate, comparator): number {
		let i = ClubEventList.binarySearch(target, comparator);
		if (i >= 0) { /* if the binarySearch return value was zero or positive, a matching object was found */
			if (!duplicate)
				return i;
		} else /* if the return value was negative, the bitwise complement of the return value is the correct index for this object */
			i = ~i;
		if (ClubEventList.validateInsertion(target, i))
			ClubEventList.list.splice(i, 0, target);
		else
			return -1;
		return i;
	}

	/**
	 @param target the object to search for in the array
	 @param comparator (optional) a method for comparing the target object type
	 @return index of a matching item in the array if one exists, otherwise the bitwise complement of the index where the item belongs
	 */
	static binarySearch(target, comparator): number {
		let low = 0,
			h = ClubEventList.list.length - 1,
			m, comparison;
		comparator = comparator || function (a, b) {
			return (a < b ? -1 : (a > b ? 1 : 0));
			/* default comparison method if one was not provided */
		};
		while (low <= h) {
			m = (low + h) >>> 1;
			/* equivalent to Math.floor((l + h) / 2) but faster */
			comparison = comparator(ClubEventList.list[m], target);
			if (comparison < 0) {
				low = m + 1;
			} else if (comparison > 0) {
				h = m - 1;
			} else {
				return m;
			}
		}
		return ~low;
	}

	/**
	 * Insert element at first position of array, meant for initializing.
	 * @param element the element to insert.
	 */
	static insert(element: ScheduledEvent): void {
		ClubEventList.list[0] = element;
	}

	/**
	 * Check for overlapping times.
	 * @param a_start the start of date one.
	 * @param a_end the end of date one.
	 * @param b_start the start of date two.
	 * @param b_end the end of date two.
	 * @return whether or not two date ranges overlap.
	 */
	static isOverlapping(a_start: Date, a_end: Date, b_start: Date, b_end: Date): boolean {
		if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
		if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
		if (b_start < a_start && a_end < b_end) return true; // a in b
		return false;
	}

	/**
	 * Remove element from list at a specific index.
	 * @param index the index to remove from.
	 */
	static remove(index: number): void {
		console.log(`Removing an event from event scheduler.`);
		console.log("before: " + ClubEventList.size());
		ClubEventList.list.splice(index, 1);
		console.log("after: " + ClubEventList.size());
	}

	static validateInsertion(target: ScheduledEvent, index: number): boolean {
		if (ClubEventList.list[index + 1]) {
			let tmp: ScheduledEvent = ClubEventList.list[index + 1];
			if (ClubEventList.isOverlapping(tmp.getEventBegin(), tmp.getEventEnd(), target.getEventBegin(), target.getEventEnd()))
				return false;
			if (ClubEventList.list[index - 1]) {
				tmp = ClubEventList.list[index - 1];
				if (ClubEventList.isOverlapping(tmp.getEventBegin(), tmp.getEventEnd(), target.getEventBegin(), target.getEventEnd()))
					return false;
			}
		}

		return true;
	}
}
