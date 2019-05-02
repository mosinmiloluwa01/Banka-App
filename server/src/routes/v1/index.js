import express from 'express';
import user from './user';
import account from './account';
import request from './request';

const routerV1 = express.Router();

routerV1.use('/auth', user);
routerV1.use('/account', account);
routerV1.use('/request', request);

export default routerV1;
