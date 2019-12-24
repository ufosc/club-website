const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
var passport = require('passport');

const User = mongoose.model("users");
const keys = require("./keys");
var GoogleTokenStrategy = require('passport-google-token').Strategy;


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			User.findById(jwt_payload.id)
				.then(user => {
					if (user)
						return done(null, user);

					return done(null, false);
				})
				.catch(err => console.log(err));
		})
	);
	

    passport.use(new GoogleTokenStrategy({
            clientID: '218365048814-qfmi0ls6jpvpks319b37rphaduqjdtqm.apps.googleusercontent.com',       
	    clientSecret: 'Q2GMs0jcrmJKNqxLaPz1GRol'
        },
        function (accessToken, refreshToken, profile, done) {
            User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
                return done(err, user);
            });
        }));
};

