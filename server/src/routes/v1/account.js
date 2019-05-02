import express from 'express';
import accountController from '../../controllers/accountController';
import { checkToken } from '../../middleware';

const account = express.Router();

account.post('/:id', checkToken, accountController.createBankAccount);

export default account;