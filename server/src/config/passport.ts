import * as jwt from 'passport-jwt';
import keys from './keys';
const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

import {User} from '../models/User';

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.secret
};

export = (passport: any) => {
	passport.use(
		new JwtStrategy(opts, (jwtPayload, done) => {
			User.findById(jwtPayload.id)
				.then((user) => {
					if (user) {
						return done(null, user);
					}

					return done(null, false);
				})
				.catch((err) => console.log(err));
		})
	);
};
