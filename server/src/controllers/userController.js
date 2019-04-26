/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendGrid from '@sendgrid/mail';
import env from 'dotenv';
import { Users } from '../../../sequelizeDB/models';

env.config();
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

class UserController {
  static createUser(req, res) {
    Users
      .findOne({
        where: { email: req.body.email },
      })
      .then((email) => {
        if (email) {
          return res.status(409).send({
            status: 409,
            message: 'email already exists',
          });
        } else {
          const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
          Users
            .create({
              email: req.body.email.toLowerCase(),
              first_name: req.body.firstName,
              last_name: req.body.lastName,
              password: hashedPassword,
              user_type: req.body.userType,
              is_admin: req.body.isAdmin,
            })
            .then((user) => {
              const {
                password, updatedAt, createdAt, ...newUser
              } = user.dataValues;
              const token = jwt.sign({ email: user.email, id: user.id },
                process.env.SECRET,
                { expiresIn: '24h' });

              const reset = `${process.env.RESET_URL}?${token}`;
              const message = `
                                <p> Hello, </p>
                                <p> Please click on <a href="${reset}">this link</a> to verify your email </p>
                                <p>Thank you. <br>
                                <b> Epic Mail Team. </b>
                                </p>
                                `;
              const mail = {
                to: req.body.email,
                from: 'noreply@epicmail.com',
                subject: 'Banka-App confirmation mail',
                html: message,
              };
              sendGrid.send(mail)
                .then(() => {
                  return res.status(200).json({
                    status: 201,
                    token,
                    message: 'A message has been sent to your email. Please verify your email',
                    data: newUser,
                  });
                })
                .catch(err => { return res.status(500).send(err); });
            })
            .catch(error => res.status(500).send(error));
        }
      })
      .catch(err => { return res.status(500).send(err); });
  }

  static clientSignup(req, res) {
    Users
      .findOne({
        where: { email: req.body.email },
      })
      .then((email) => {
        if (email) {
          return res.status(409).send({
            status: 409,
            message: 'email already exists',
          });
        } else {
          const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
          Users
            .create({
              email: req.body.email.toLowerCase(),
              first_name: req.body.firstName,
              last_name: req.body.lastName,
              password: hashedPassword,
              user_type: 'client',
              is_admin: false,
            })
            .then((user) => {
              const {
                password, updatedAt, createdAt, ...newUser
              } = user.dataValues;
              const token = jwt.sign({ email: user.email, id: user.id },
                process.env.SECRET,
                { expiresIn: '24h' });

              const reset = `${process.env.RESET_URL}?${token}`;
              const message = `
                                <p> Hello, </p>
                                <p> Please click on <a href="${reset}">this link</a> to verify your email </p>
                                <p>Thank you. <br>
                                <b> Epic Mail Team. </b>
                                </p>
                                `;
              const mail = {
                to: req.body.email,
                from: 'noreply@epicmail.com',
                subject: 'Banka-App confirmation mail',
                html: message,
              };
              sendGrid.send(mail)
                .then(() => {
                  return res.status(200).json({
                    status: 201,
                    token,
                    message: 'A message has been sent to your email. Please verify your email',
                    data: newUser,
                  });
                })
                .catch(err => { return res.status(500).send(err); });
            })
            .catch(error => res.status(400).send(error));
        }
      })
      .catch(err => { return res.status(500).send(err); });
  }

  static login(req, res) {
    Users
      .findOne({
        where: { email: req.body.email },
      })
      .then((user) => {
        const verifyPassword = bcrypt.compareSync(req.body.password, user.password);
        if (user && !verifyPassword) {
          return res.status(400).send({
            status: 400,
            message: 'user credentials is incorrect',
          });
        } else {
          const {
            password, updatedAt, createdAt, ...newUser
          } = user.dataValues;
          const token = jwt.sign({ email: user.email, id: user.id },
            process.env.SECRET,
            { expiresIn: '24h' });
          return res.status(200).send({
            status: 200,
            data: {
              token,
              newUser,
            },
          });
        }
      });
  }
}

export default UserController;
