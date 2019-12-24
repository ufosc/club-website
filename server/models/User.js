var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var keys = require("../config/keys");



var db = mongoose.connect('mongodb://localhost:27017/clubsite');
// create schema
var UserSchema = new Schema({
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
	},
	googleProvider: {
            type: {
                id: String,
                token: String
            },
            select: false
        }
});


   UserSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
        var that = this;
        return this.findOne({
            'googleProvider.id': profile.id
        }, function(err, user) {
            
            if (!user) {
                var newUser = new that({
                    name: profile.displayName,
                    email: profile.emails[0].value,
		    password: keys.clientId,
		    

                    googleProvider: {
                        id: profile.id,
                        token: accessToken
                    }
                });

                newUser.save(function(error, savedUser) {
			
                    if (error) {
                        console.log(error);

                    }
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
    };


module.exports = mongoose.model("users", UserSchema);
