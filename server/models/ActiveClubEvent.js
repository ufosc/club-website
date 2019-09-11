const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActiveClubEventSchema = new Schema({
	code: {
		type: String,
		required: true
	}
});

module.exports = ActiveClubEvent = mongoose.model('activeclubevent', ActiveClubEventSchema);
