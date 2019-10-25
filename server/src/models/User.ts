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
		default: []
	},
	admin: {
		type: Boolean,
		required: true,
		default: false
	},
	discord: {
		type: String,
		required: false,
		default: ''
	}
});

interface IUser extends mongoose.Document {
	name: string;
	email: string;
	password: string;
	date?: Date;
	events: [any];
	admin: boolean;
	discord: string;
}

export const User = mongoose.model<IUser>('users', UserSchema);
