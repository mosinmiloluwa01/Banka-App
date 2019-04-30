/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import { Users } from '../../../sequelizeDB/models';

env.config();

class SocialAuthController {
  /* function that creates the user */
  static facebookSignup(user, done) {
    Users.findOrCreate({
      where: {
        email: user.email,
      },
      defaults: user,
    }).spread((foundOrCreated, created) => {
      const {
        id, email, first_name, last_name, user_type, is_admin,
      } = foundOrCreated.dataValues;
      done(null, {
        email, id, first_name, last_name, user_type, is_admin,
      });
    });
  }

  /* this function is called by a call back function */
  static response(req, res) {
    const user = {
      id: req.user.id,
      email: req.user.email,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      user_type: 'client',
      is_Admin: false,
    };
    user.token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET, { expiresIn: '24h' });
    if (req.user.email) {
      return res.status(201).send({
        status: 201,
        message: 'Signup was successful',
        user,
      });
    }
    return res.status(409).send({
      status: 409,
      message: 'You have already signed up',
      user,
    });
  }

  /* so this is called from passport.js */
  static passportCallback(accessToken, refreshToken, profile, done) {console.log(profile);
    const userProfile = {
      first_name: profile.name.familyName,
      last_name: profile.name.givenName,
      email: profile.emails[0].value,
      password: '123456',
      user_type: 'client',
      is_admin: false,
    };
    SocialAuthController.facebookSignup(userProfile, done);
  }
}

export default SocialAuthController;
