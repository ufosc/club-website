import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	events: {
		type: Array,
		default: {}
	}
});

export const User: mongoose.Model<any> = mongoose.model('users', UserSchema);
