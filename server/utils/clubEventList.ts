import {ScheduledEvent} from "../events/eventhandler";

/**
 * This util provides an ordered list implementation that maintains order upon insertion.
 * Insertion is done by using a binary search and insertion so that order is maintained.
 * @constructor The default constructor.
 */
export function ClubEventList() {
	this.list = [];
}

ClubEventList.prototype.size = function() {
	console.log(this.list.length);
	return this.list.length;
};

ClubEventList.prototype.insert = function(element : ScheduledEvent) {
	this.list[0] = element;
};

ClubEventList.prototype.remove = function(index) {
	console.log(`Removing an event from event scheduler.`);
	console.log("before: " + this.size());
	this.list.splice(index, 1);
	console.log("after: " + this.size());
};

// https://stackoverflow.com/questions/12369824/javascript-binary-search-insertion-preformance
/* 
    target: the object to search for in the array
    comparator: (optional) a method for comparing the target object type
    return value: index of a matching item in the array if one exists, otherwise the bitwise complement of the index where the item belongs
*/
ClubEventList.prototype.binarySearch = function(target, comparator) {
	let low = 0,
		h = this.list.length - 1,
		m, comparison;
	comparator = comparator || function (a, b) {
		return (a < b ? -1 : (a > b ? 1 : 0)); /* default comparison method if one was not provided */
	};
	while (low <= h) {
		m = (low + h) >>> 1; /* equivalent to Math.floor((l + h) / 2) but faster */
		comparison = comparator(this.list[m], target);
		if (comparison < 0) {
			low = m + 1;
		} else if (comparison > 0) {
			h = m - 1;
		} else {
			return m;
		}
	}
	return ~low;
};
/*
    target: the object to insert into the array
    duplicate: (optional) whether to insert the object into the array even if a matching object already exists in the array (false by default)
    comparator: (optional) a method for comparing the target object type
    return value: the index where the object was inserted into the array, or the index of a matching object in the array if a match was found and the duplicate parameter was false
*/
ClubEventList.prototype.binaryInsert = function(target: ScheduledEvent, duplicate, comparator) {
	let i = this.binarySearch(target, comparator);
	if (i >= 0) { /* if the binarySearch return value was zero or positive, a matching object was found */
		if (!duplicate)
			return i;
	} else /* if the return value was negative, the bitwise complement of the return value is the correct index for this object */
		i = ~i;
	if (this.validateInsertion(target, i))
		this.list.splice(i, 0, target);
	else
		return -1;
	return i;
};

ClubEventList.prototype.validateInsertion = function(target: ScheduledEvent, index: number): boolean {
	if (this.list[index + 1]) {
		let tmp: ScheduledEvent = this.list[index + 1];
		if (isOverlapping(tmp.getEventBegin(), tmp.getEventEnd(), target.getEventBegin(), target.getEventEnd()))
			return false;
		if (this.list[index - 1]) {
			tmp = this.list[index - 1];
			if (isOverlapping(tmp.getEventBegin(), tmp.getEventEnd(), target.getEventBegin(), target.getEventEnd()))
				return false;
		}
	}

	return true;
};

const isOverlapping = (a_start: Date, a_end: Date, b_start: Date, b_end: Date) => {
	if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
	if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
	if (b_start < a_start && a_end < b_end) return true; // a in b
	return false;
};
