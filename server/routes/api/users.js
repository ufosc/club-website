const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateEventSigninInput = require("../../validation/eventSignin");
const validateEventCreation = require("../../validation/eventSignin");
const eventHandler = require("../../events/eventhandler");

// Load User model
const User = require("../../models/User");
const ClubEvent = require("../../models/ClubEvent");

/**
 * @route POST api/users/register
 * @desc Register user
 * @access Public
 **/
router.post("/register", (req, res) => {
	// form validation

	const {errors, isValid} = validateRegisterInput(req.body);

	// check validation
	if (!isValid)
		return res.status(400).json(errors);

	User.findOne({email: req.body.email}).then(user => {
		if (user)
			return res.status(400).json({email: "Email already exists"});
		else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			});

			// Hash password before saving in database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
	});
});

/**
 * @route POST api/users/event-signin
 * @desc sign users into an event with authentication.
 * @access Public
 */
router.post("/eventSignin", (req, res) => {
	// form validation

	const {errors, isValid} = validateEventSigninInput(req.body);

	// check validation
	if (!isValid)
		return res.status(400).json(errors);


	User.findOneAndUpdate({email: req.body.email}, (err, user) => {
		if (err) throw err;
		// update user's attended events
		if (user) {

			if (eventHandler.isClubEventEnabled()) {

				user.events.push();
			}

		}
	});
});

router.post("/createEvent", (req, res) => {

	const {errors, isValid} = validateEventCreation(req.body);

	if (!isValid)
		return res.status(400).json(errors);

	const {eventCode} = req.body.eventcode;
	const {eventName} = req.body.eventname;
	const {endTime} = req.body.endtime;

	eventHandler.clubEventEmitter.emit('enable', eventCode, eventName, endTime);

});

/**
 * @route POST api/users/login
 * @desc Login user and return JWT token
 * @access Public
 **/
router.post("/login", (req, res) => {
	// Form validation

	const {errors, isValid} = validateLoginInput(req.body);

	// Check validation
	if (!isValid)
		return res.status(400).json(errors);

	const email = req.body.email;
	const password = req.body.password;

	// find user by email
	User.findOne({email}).then(user => {
		// check if user exists
		if (!user)
			return res.status(404).json({emailnotfound: "Email not found."});

		// check password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// user matched
				// create JWT Payload
				const payload = {
					id: user.id,
					name: user.name
				};

				// sign token
				jwt.sign(
					payload,
					keys.secret,
					{
						expiresIn: 31556926 // 1 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							token: "Bearer " + token
						});
					}
				);
			} else
				return res
					.status(400)
					.json({passwordincorrect: "Incorrect password."});
		});
	});
});

module.exports = router;
