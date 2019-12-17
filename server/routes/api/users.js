const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

//route google sign-in

router.route('/auth/google')
    .post(passport.authenticate('google-token', {session: false}), function(req, res, next) {
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }
        req.auth = {
            id: req.user.id
        };

        next();
    }, generateToken, sendToken);
	
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
			return res.status(404).json({emailnotfound: "Email not found"});

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
					.json({passwordincorrect: "Password incorrect"});
		});
	});
});



module.exports = router;
