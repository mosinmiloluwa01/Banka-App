import express from 'express';
import requestController from '../../controllers/requestController';
import { checkToken } from '../../middleware';

const request = express.Router();

request.post('/:id', checkToken, requestController.makeRequests);

export default request;