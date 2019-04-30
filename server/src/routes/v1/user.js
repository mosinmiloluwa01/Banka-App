import express from 'express';
import passport from 'passport';
import userController from '../../controllers/userController';
import socialAuthController from '../../controllers/socialAuthController';

const user = express.Router();

user.post('/createuser', userController.createUser);
user.post('/signup', userController.clientSignup);
user.post('/login', userController.login);
// route for facebook authentication and signup
user.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
// handle the callback after facebook has authenticated the user
user.get('/facebook/callback', passport.authenticate('facebook', { session: false }), socialAuthController.response);
export default user;
