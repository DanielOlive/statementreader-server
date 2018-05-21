import fs from "fs";
import csvParse from 'csv-parse'

import fetch from 'node-fetch'
import config from '../config'

// import transactions from "../routes/transactions";



const saveTransactions = (newTrans) => {

    const newTransactions = newTrans;

    console.log(newTransactions)

    fetch(config.transactionPath, {
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
    const csvStream = csvParse(config.csvOptions);
    const json = []
    fs.createReadStream(_file)

        .pipe(csvStream)

        .on('data', (data) => {
            const transaction = {}
            // TODO: add support for more Back csv formats
            data.forEach((item, idx) => {
                if (config.headers[idx] !== undefined) 
                transaction[config.headers[idx]] = item
            });
             const current = transaction.date.split('/')
            
             transaction.reference = transaction.reference.split(' ')[1];
             transaction.amount = transaction.amount.replace(' ','');
             transaction.processDate = transaction.processDate.replace(' ','');
             transaction.date = new Date(`${current[2]}-${current[1]}-${current[0]}`)
            
            // const obj = transaction.map((items, idx) => ({config.csvDefaults.header[idx]: items})

             json.push(transaction);
        })
        .on('end', () => {

            const streamData = JSON.stringify({json}, null, 4)
            console.log(streamData)
            saveTransactions(JSON.parse(streamData).json)
        })
        .on('error', (err) => console.log(err.message))
}

export default csvLoader