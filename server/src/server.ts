import {ScheduledEvent} from './events/ScheduledEvent';

import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

import passportJWT from './config/passport';
import userRouter from './routes/api/users';

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

// establish connection to db
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
	.then(() => console.log('Successfully established connection to MongoDB.'))
	.catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
passportJWT(passport);

// Routes
app.use('/api/users', userRouter);
app.use('../client/public', express.static('public'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server now running on port ${port}!`));

ScheduledEvent.rescheduleEvents();
