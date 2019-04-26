/* eslint-disable arrow-body-style */
/* eslint-disable import/no-duplicates */
/* eslint-disable consistent-return */
import { Accounts } from '../../../sequelizeDB/models';
import { Users } from '../../../sequelizeDB/models';

class accountController {
  static createBankAccount(req, res) {
    Users
      .findByPk(req.params.id)
      .then((userAccount) => {
        if (!userAccount) {
          return res.status(404).send({
            status: 404,
            message: 'user does not exist',
          });
        }
        Accounts.create({
          account_number: req.body.accountNumber,
          created_on: new Date(),
          user_id: userAccount.id,
          account_type: req.body.accountType,
          account_status: 'active',
          account_balance: req.body.balance,
        })
          .then((accountDetails) => {
            return res.status(200).json({
              status: 201,
              message: 'Account created successfully',
              data: accountDetails,
            });
          })
          .catch(error => res.status(500).send(error));
      });
  }
}

export default accountController;
