import express from 'express';
import userController from '../../controllers/userController';

const user = express.Router();

user.post('/createuser', userController.createUser);
user.post('/login', userController.login);

export default user;
