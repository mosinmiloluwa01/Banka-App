/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';
import { Users } from '../../../sequelizeDB/models';

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
              email: req.body.email,
              first_name: req.body.firstName,
              last_name: req.body.lastName,
              password: hashedPassword,
              user_type: req.body.userType,
              is_admin: req.body.isAdmin,
            })
            .then(user => res.status(201).send({
              status: 201,
              message: 'User created successfully',
              data: user,
            }))
            .catch(error => res.status(400).send(error));
        }
      })
      .catch(err => { return res.status(500).send(err); });
  }
}

export default UserController;
