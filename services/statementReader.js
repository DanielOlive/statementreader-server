/**
 * Created by dolive on 5/20/16.
 */
var csv = require('csv-parser'),
    fs = require('fs'),
    _ = require('underscore'),
    path = require('path'),
    config = require('../config'),
    account = [],
    self,
    json = [],
    check = /(LONDON|PAYMENT RECEIVED)/,
    csvStream = csv(config.csvDefaults);

export const importCSVFile = (_file, _callback) => {

    convertCSVData(
        _file, 
        (res) => {
            getJsonFile((jsonData) => {
                console.log('importing file');
                console.log(res)
                mergeData(jsonData, res);
            })
    });
}

const mergeData = (existingTrans, newTrans) => {

    // let obj = {};
    // const newTransactions = JSON.parse(newTrans)
    // const existingTransactions = old
    // console.log(obj)
    // writeJsonFile(obj)
    
    const  obj = {};
    const newTransactions = JSON.parse(newTrans);

    obj.account = _.uniq(
        _.union(
            existingTrans.account, 
            newTransactions.account
        ), 
        false, 
        (item, key, reference) => {
        return item.reference;
    });

    if (_.isEmpty(existingTrans)) {
        console.log('exists');
        // existingTrans.account = obj.account;
        // writeJsonFile(obj);
    }else{
        console.log('does note exist');
    } 
    writeJsonFile(obj);


}

export const convertCSVData = (_file, _callback) => {

    fs.createReadStream(_file)

        .pipe(csvStream)

        .on('data', (data) => {

            var arr = data.date.split('/'),
                dateObj = new Date(arr[2], arr[1] - 1, arr[0]);

            data.sortDate = dateObj;
            data.reference = data.reference.split(' ')[1];
            json.push(data);
        })

        .on('error', (err) => console.log('ERROR: Cannot convert CSV Data', err))
        .on('end', (data) =>{
            account = sortDate(json);
            _callback(JSON.stringify({
                account
            }, null, 4));
        });
}

const sortDate = (data) => {

    var sortedData = _.sortBy(data, (o) => o.sortDate);
    var arr = [];
    sortedData.forEach((item) => {
        if (!filterCheck(item.retailer)) {
            arr.push(item);
        }
    });
    return arr;
}

const filterCheck = (arr) => {
    if (arr.toString().match(check)) {
        return true;
    }
}

const writeJsonFile = (data) => {
    console.log('write');

    fs.writeFile(config.database, JSON.stringify(data, null, 4), (err) => {
        if (err) console.log('ERROR: Writing data to JSON file');
        console.log('It\'s saved!');
    });
}

export const getJsonFile = (_callback) => {

    console.log('load file');
    fs.readFile(config.database, 'UTF8', (err, data) => {

        if (err){
            console.log(err, err.code)
            // If no file exists create one then re-import it
            if(err.code === 'ENOENT') {
                writeJsonFile({})
                getJsonFile(_callback)
            }
        } else {
            _callback(JSON.parse(data));
        }
    });

}