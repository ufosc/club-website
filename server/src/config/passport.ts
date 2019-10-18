import * as jwt from 'passport-jwt';
import mongoose from 'mongoose';
import keys from './keys';
const JwtStrategy : jwt.Strategy = jwt.Strategy;
const ExtractJwt : jwt.ExtractJwt = jwt.ExtractJwt;
const User = mongoose.model("users");

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.secret
};

export = passport => {
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
};
