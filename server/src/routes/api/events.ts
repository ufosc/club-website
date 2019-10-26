import express from 'express';

const eventRouter = express.Router();

import * as eventHandler from '../../events/eventhandler';
import validateEventCreation from '../../validation/createEvent';
import validateEventSigninInput from '../../validation/eventSignin';

// Load User model
// @ts-ignore
import {User} from '../../models/User';
import {ScheduledEvent} from "../../events/ScheduledEvent";
import {ClubEventWrapper} from "../../events/ClubEventWrapper";

/**
 * @file events.ts
 * @desc used for handling all club-event HTTP requests.
 */

/**
 * @route POST api/events/signin
 * @desc sign users into an event with authentication.
 * @access Public
 * Post body requirements:
 * -
 */
eventRouter.post('/signin', (req: express.Request, res: express.Response) => {
	// form validation
	const {errors, isValid} = validateEventSigninInput(req.body);

	// check validation
	if (!isValid)
		return res.status(400).json(errors);

	const email: string = req.body.email;
	let evt: Promise<ClubEventWrapper> = ScheduledEvent.getActiveEvent();

	evt.then((event: ClubEventWrapper) => {
		if (event) {
			if (!event.getAttendees().includes(email)) {
				User.collection.findOneAndUpdate({email: email}, {'$addToSet': {events: event.getObjectId()}}, (err, user : any) => {
					if (err)
						throw err;
					// update user's attended events
					event.addAttendee(email);
					res.status(200).json({
						success: true,
						event: event.getObjectId(),
						user: email,
						message: `Successfully signed user '${email}' into the active event!`
					});
				});
			}
		} else
			res.status(404).json({noactiveevent: 'There is currently no active event.'});
	}).catch((e) => {
		if (e)
			console.log(e);
		res.status(404).json({noactiveevent: 'There is currently no active event.'});
	});
});

/**
 * @route POST api/events/create
 * @desc allow authenticated users to create new events.
 * @access Private
 * Post body requirements:
 * - eventcode
 * - eventname
 * - starttime
 * - endtime
 * - sender
 * - discord? <- optional
 */
eventRouter.post('/create', async (req: express.Request, res: express.Response) => {
	const {errors, isValid} = await validateEventCreation(req.body);

	if (!isValid)
		return res.status(400).json(errors);

	const eventCode = req.body.eventcode;
	const eventName = req.body.eventname;
	const startTime = req.body.starttime;
	const endTime = req.body.endtime;

	eventHandler.clubEventEmitter.emit('schedule', eventCode, eventName,
		new Date(Date.parse(startTime)),
		new Date(Date.parse(endTime)), false, res);

});

export default eventRouter;
