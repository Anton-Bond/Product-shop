import passportJwt from 'passport-jwt';

import { User } from '../models/user';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
};

export const jwt = (passport: { use: (arg0: passportJwt.Strategy) => void; }) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select('email _id');

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
      }

    })
  )
}
