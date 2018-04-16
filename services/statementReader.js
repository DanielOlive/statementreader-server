/**
 * Created by dolive on 5/20/16.
 */
var csv = require('csv-parser'),
    fs = require('fs'),
    _ = require('underscore'),
    path = require('path'),
    config = require('../config'),
    listData = [],
    self,
    json = [],
    check = /(LONDON|PAYMENT RECEIVED)/,
    csvStream = csv(config.csvDefaults);

module.exports = function () {

    return {
        importCSVFile: function (_file, _callback) {

            var csvData = null;
            self = this;

            self.convertCSVData(_file, function (data) {
                csvData = data;
                self.getJsonFile(function (jsonData) {
                    console.log('importing file');
                    self.mergedata(jsonData, csvData);
                })
            });
        },
        mergedata: function (_old, _new) {

            var obj = {};
            _new = JSON.parse(_new);

            obj.account = _.uniq(_.union(_old.account, _new.account), false, function (item, key, Reference) {
                return item.Reference;
            });

            if (_.isEmpty(_old)) {
                console.log('exisits');
                _old.account = obj.account;
                self.writeJsonFile(obj);
            }else{
                console.log('does note exist');
                self.writeJsonFile(obj);
            }
        },
        convertCSVData: function (_file, _callback) {

            self = this;

            fs.createReadStream(_file)

                .pipe(csvStream)

                .on('data', (data) => {
                    var arr = data.Date.split('/'),
                        dateObj = new Date(arr[2], arr[1] - 1, arr[0]);

                    data.sortDate = dateObj;
                    data.Reference = data.Reference.split(' ')[1];
                    json.push(data);
                    
                })

                .on('error', (err) => console.log('ERROR: Cannot convert CSV Data', err))

                .on('end', (data) =>{
                    listData = self.sortDate(json);
                    _callback(JSON.stringify({
                        account: listData
                    }, null, 4));
                });
        },

        sortDate: function (data) {

            var sortedData = _.sortBy(data, (o) => o.sortDate);
            var arr = [];
            sortedData.forEach((item) => {
                if (!self.filterCheck(item.Retailer)) {
                    arr.push(item);
                }
            });
            return arr;
        },
        filterCheck: (arr) => {
            if (arr.toString().match(check)) {
                return true;
            }
        },
        writeJsonFile: (data) => {
            console.log('write');

            fs.writeFile(config.database, JSON.stringify(data, null, 4), (err) => {
                if (err) console.log('ERROR: Writing data to JSON file');
                console.log('It\'s saved!');
            });
        },

        getJsonFile: function (_callback) {

            fs.stat(config.database, (err, res) => {

                if (err) {
                    console.log('ERROR: Please Import a data file');
                    _callback({});
                } else {
                    console.log('load file');
                    fs.readFile(config.database, 'UTF8', (err, data) => {
                        if (err) throw err;
                        _callback(JSON.parse(data));
                    });
                }
            })
        }
    }
}