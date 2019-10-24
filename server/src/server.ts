import {ScheduledEvent} from './events/ScheduledEvent';

import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

import passportJWT from './config/passport';
import userRouter from './routes/api/users';
import eventRouter from './routes/api/events';

const app = express();

// body parser middleware
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

// db config
import keys from './config/keys';
import {ClubEventList} from "./utils/clubEventList";

// establish connection to db
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
	.then(() => console.log('Successfully established connection to MongoDB.'))
	.catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
passportJWT(passport);

// Routes
app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);
app.use('../client/public', express.static('public'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server now running on port ${port}!`));

const exitHandler = (options, exitCode) => {
	if (options.cleanup) console.log(`Exiting with ${ClubEventList.size()} POTENTIAL (depends on reboot time) events to reschedule.`);
	if (exitCode || exitCode === 0) console.log(exitCode);
	if (options.exit) process.exit();
};

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

ScheduledEvent.rescheduleEvents();
