import express from 'express';
import userController from '../../controllers/userController';

const user = express.Router();

user.post('/createuser', userController.createUser);
user.post('/signup', userController.clientSignup);
user.post('/login', userController.login);

export default user;
