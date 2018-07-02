import fs from 'fs';
import csvParse from 'csv-parse';
import axios from 'axios';
import * as accountParsers from './account-parsers';

import config from '../config';

// import transactions from "../routes/transactions";

const saveTransactions = newTrans => {
  const newTransactions = newTrans;

  // console.log(newTransactions)

  axios
    .post(config.transactionPath, newTransactions)
    // .then((res) => res.json())
    .catch(error => console.error('Error:', error));
  // .then(response => console.log('Success:', response))
};

const csvLoader = (_file, provider) => {
  const csvStream = csvParse(config.csvOptions);
  const json = [];
  fs
    .createReadStream(_file)

    .pipe(csvStream)

    .on('data', data => {
      const transaction = accountParsers[provider](data, provider);
      transaction.created = new Date();
      transaction.provider = provider;
      json.push(transaction);
      
    })
    .on('end', () => {
      const streamData = JSON.stringify({ json }, null, 4);
      console.log(streamData);
      saveTransactions(JSON.parse(streamData).json);
    })
    .on('error', err => console.log(err.message));
};

export default csvLoader;
