import passport from "passport";
import { User } from "../entities/user.entity";
const LocalStrategy = require('passport-local').Strategy
import * as bcrypt from 'bcrypt';

passport.use(new LocalStrategy(
  function(email:any, password:any, done:any) {
    User.findOne({ email: email }, async function(err:any, user:any) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

export default passport