import express from 'express';
import jwt_decode from 'jwt-decode';
import fetch from 'node-fetch';
import btoa from 'btoa';
import {isValid, getDecodedJwt} from "../../utils/jwt";
import {User} from "../../models/User";
import {Types} from "mongoose";

const discordRouter = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirect = encodeURIComponent('http://localhost:5000/api/discord/callback');

/**
 * Utility function for handling unhandled promise rejection in the callback route.
 * @param fn
 */
const catchAsyncErrors = fn => (
	(req, res, next) => {
		const routePromise = fn(req, res, next);
		if (routePromise.catch) {
			routePromise.catch(err => next(err));
		}
	}
);

/*
	** HOW TO TEST IF THE DISCORD OAUTH2 LINKS TO YOUR USER ACCOUNT PROPERLY **
	---------------------------------------------------------------------------
	For testing, load this link into your browser: https://discordapp.com/oauth2/authorize?client_id=552651352942051328&scope=identify&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fdiscord%2Fcallback
	After that, you'll want to use Postman to make a GET request to the /login route (make sure to set your JWT Bearer token in the authorization tab of the request).
	Next, authorize the app on the link that you opened in your browser (the one mentioned above).
	You should get a JSON response with your discord user information.
	Check the Mongo database to verify that your user document stored YOUR discord user id, it should be a long number.
 */

/*
	* HOW TO LINK THIS TO THE FRONTEND *
	------------------------------------
	First, make a cool button on the user dash. Have it only clickable if the user is not linked to discord. Just query the database to see if they are linked.
	Next, have the button Link to http://localhost:5000/api/discord/login and set the HTTP header equal to the JWT (check out my jwt util)
	When the callback runs, have the state update and give them some sort of indication of successful linkage.
	e.g. Successfully linked with you Discord user: Jon#6956!
 */

let token;

discordRouter.get('/login', (req, res) => {
	token = getDecodedJwt(req);
	if (isValid(token))
		res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);
	else
		res.json({auth: 'You must be signed into your user account to link your discord account!'});
});

discordRouter.get('/callback', catchAsyncErrors(async (req, res) => {
	if (token && (token.exp > (Date.now() / 1000))) {
		if (!req.query.code) throw new Error('NoCodeProvided');
		const code = req.query.code;
		const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
		const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
			{
				method: 'POST',
				headers: {
					Authorization: `Basic ${creds}`,
				},
			});
		const json = await response.json();
		const resp = await fetch('http://discordapp.com/api/users/@me', {
			headers: {
				Authorization: `Bearer ${json.access_token}`
			}
		});
		const discordUser = await resp.json();
		console.log(`Attempting to link ${discordUser} to user with id: ${token.id}`);
		await User.collection.updateOne({_id: Types.ObjectId(<string>token.id)}, {$set: {discord: discordUser.id}}).catch(err => console.log(err));
		res.status(200).json(discordUser);
	} else
		res.json({auth: 'You must be signed into your user account to link your discord account!'});
}));

export default discordRouter;
