import express from 'express';
const router = express.Router();

import * as eventHandler from '../../events/eventhandler';
import validateEventCreation from '../../validation/createEvent';
import validateEventSigninInput from '../../validation/eventSignin';

// Load User model
// @ts-ignore
import {User} from '../../models/User';

/**
 * @file events.ts
 * @desc used for handling all club-event HTTP requests.
 */

/**
 * @route POST api/events/event-signin
 * @desc sign users into an event with authentication.
 * @access Public
 */
router.post('/eventSignin', (req: express.Request, res: express.Response) => {
	// form validation
	const {errors, isValid} = validateEventSigninInput(req.body);

	// check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOneAndUpdate({email: req.body.email}, (err, user) => {
		if (err) { throw err; }
		// update user's attended events
		if (user) {
			if (eventHandler.isClubEventEnabled()) {
				user.events.push();
			}

		}
	});
});

/**
 * @route POST api/events/createEvent
 * @desc allow authenticated users to create new events.
 * @access Public
 */
router.post('/createEvent', (req: express.Request, res: express.Response) => {
	const {errors, isValid} = validateEventCreation(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const eventCode = req.body.eventcode;
	const eventName = req.body.eventname;
	const startTime = req.body.starttime;
	const endTime = req.body.endtime;

	eventHandler.clubEventEmitter.emit('schedule', eventCode, eventName,
		new Date(Date.parse(startTime)),
		new Date(Date.parse(endTime)), res);

});
