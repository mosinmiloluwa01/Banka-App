import express from 'express';
import user from './user';
import account from './account';

const routerV1 = express.Router();

routerV1.use('/auth', user);
routerV1.use('/account', account);

export default routerV1;
