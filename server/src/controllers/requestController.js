/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-duplicates */
/* eslint-disable consistent-return */
import { Accounts } from '../../../sequelizeDB/models';
import { Users } from '../../../sequelizeDB/models';
import { Requests } from '../../../sequelizeDB/models';

class requestController {
  static makeRequests(req, res) {
    Users.findByPk(req.decodedMessage.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            status: 404,
            message: 'user does not exist',
          });
        }
        Accounts.findOne({
          where: { account_number: req.body.accountNumber },
        })
          .then((accNumber) => {console.log('=========> account number', accNumber);
            if (!accNumber) {
              return res.status(404).send({
                status: 404,
                message: 'account does not exist',
              });
            }console.log('==================> requestDetails');
            Requests.create({
              created_on: new Date(),
              request_type: req.body.requestType,
              account_id: accNumber.dataValues.id,
              user_id: user.id,
              amount: req.body.amount,
            })
              .then((requestDetails) => {
                if (!requestDetails) {
                  return res.status(500).json({
                    status: 500,
                    message: 'something is wrong with your request',
                  });
                }
                return res.status(200).json({
                  status: 201,
                  message: 'Your request has been created. It will be attended to shortly',
                  data: requestDetails,
                });
              })
              .catch(error => res.status(500).send(error));
          })
          .catch(error => res.status(500).send(error));
      })
      .catch(error => res.status(500).send(error));
  }
}
export default requestController;
