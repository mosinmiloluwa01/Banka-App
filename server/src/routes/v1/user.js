import express from 'express';
import userController from '../../controllers/userController';

const user = express.Router();

user.post('/signup', userController.createUser);

export default user;
