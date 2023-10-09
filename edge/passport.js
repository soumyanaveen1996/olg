const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const User = require('./app/models/user');
const USER_FIELDS_IN_AUTH_RESPONSE = ['userId', 'name', 'dob', 'domains', 'userRole'];

passport.use('local', new LocalStrategy({ usernameField: 'userId', passwordField: 'pin' },
	async function (userId, pin, done) {
		let user = await User.findOne({ userId });
		if (_.isEmpty(user)) {
			return done({ message: 'User not found' });
		}
		if(_.isEmpty(_.get(user, 'pin'))) {
			return done({ message: 'User PIN not setup yet' });
		}
		if (!await user.comparePin(pin)) {
			return done({ message: 'Invalid PIN' });
		}
		let userDetails = _.pick(user, USER_FIELDS_IN_AUTH_RESPONSE);
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
		return done(null, { user: userDetails, token });
	}
));

passport.use(new JWTStrategy({
	jwtFromRequest: ExtractJwt.fromHeader('token') || ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET
},
	async function (jwtPayload, done) {
		let user = await User.findById(jwtPayload._id);
		if (_.isEmpty(user)) {
			return done({ message: 'User not found' });
		}
		return done(null, user);
	}
));