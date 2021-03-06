import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Promise from 'bluebird';
// import hbs from 'hbs'

// import config from './config'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import {importCSVFile, getJsonFile} from './services/statementReader.js'

import transactions from './routes/transactions';
import auth from './routes/auth';

const app = express();
// const partialLoader = require('./services/partial-loader')();

dotenv.config();
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/transactions', transactions);
app.use('/api/auth', auth);
app.use(express.static('../public'));
app.use(express.static('../public/views/'));
app.set('view engine', 'hbs');

const server = app.listen(3020, () => {
  console.log(`Server started on port ${server.address().port} ...`);
});
