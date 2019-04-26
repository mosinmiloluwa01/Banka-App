import express from 'express';
import accountController from '../../controllers/accountController';

const account = express.Router();

account.post('/:id', accountController.createBankAccount);

export default account;