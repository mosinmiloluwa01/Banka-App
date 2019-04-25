import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import env from 'dotenv';
import router from './src/routes';

env.config();
const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Listening on ${port}`));

export default app;
