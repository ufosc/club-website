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

let User: mongoose.Model<any>;
module.exports = User = mongoose.model("users", UserSchema);
