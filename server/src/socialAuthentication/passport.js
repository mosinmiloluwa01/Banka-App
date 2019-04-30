import passport from 'passport';
import env from 'dotenv';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import SocialAuthController from '../controllers/socialAuthController';

env.config();
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileURL: 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
  profileFields: ['id', 'emails', 'name', 'photos', 'displayName'],
}, SocialAuthController.passportCallback));
