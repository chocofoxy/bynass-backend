import passport from "passport";
import { User } from "../entities/user.entity";

const LocalStrategy = require('passport-local').Strategy,
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt

import * as bcrypt from 'bcrypt';

const opts = { 
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() ,
  secretOrKey: 'secret',
  issuer: 'accounts.examplesoft.com',
  audience: 'yoursite.net'
}


passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (username: any, password: any, done: any) {
    User.findOne({ email: username }, async function (err: any, user: any) {
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
))

passport.use(new JwtStrategy(opts, function (jwt_payload:any, done:any) {
  User.findOne({ id: jwt_payload.sub }, function (err:any, user:any ) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}))


export default passport