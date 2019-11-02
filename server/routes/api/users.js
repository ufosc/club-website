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
const config = require(".../client/src/views/SignIn");

let checkToken = (req, res, next) => {
  let token =  req.headers['authorization']; 
    if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
    }
    var decodeToken = jwt_decode(token);

  
  				const payload = {
					id: decodeToken.googleId,
				};

				// sign token
				jwt.sign(
					payload,
					config.secret,
					{
						expiresIn: 31556926 // 1 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							token:  token
						});
					}
				);

 
};

module.exports = {
  googeToken: checkToken
}

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
