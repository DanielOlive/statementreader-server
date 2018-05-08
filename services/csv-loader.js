import fs from "fs";
import csv from 'csv-parser'

import fetch from 'node-fetch'
import config from '../config'
import transactions from "../routes/transactions";

const json = []
const csvStream = csv(config.csvDefaults);

const saveTransactions = (newTrans) => {

    const newTransactions = newTrans;

    fetch('http://localhost:3020/api/transactions', {
            method: 'POST',
            body: JSON.stringify(newTransactions),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response))
}

const csvLoader = (_file) => {

    fs.createReadStream(_file)

        .pipe(csvStream)

        .on('data', (data) => {

            const transaction = data
            const current = transaction.date.split('/')
           
            transaction.reference = data.reference.split(' ')[1];
            transaction.amount = data.amount.replace(' ','');
            transaction.processDate = data.processDate.replace(' ','');
            transaction.date = new Date(`${current[2]}-${current[1]}-${current[0]}`)

            json.push(transaction);
        })

        .on('end', () => {

            const streamData = JSON.stringify({json}, null, 4)
            saveTransactions(JSON.parse(streamData).json)
        })
        .on('error', (err) => console.log(err.message))
}

export default csvLoader