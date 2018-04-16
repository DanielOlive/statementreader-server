/**
 * Created by dolive on 6/9/16.
 */

var config = {
    database: './data/data.json',
    csvFile: './data02.csv',
    partialPath: '../views/partials/',
    error: {
        uploadfile: 'Please upload a file'
    },
    csvDefaults: {
        raw: false,     // do not decode to utf-8 strings
        separator: ',', // specify optional cell separator
        quote: '"',     // specify optional quote character
        escape: '"',    // specify optional escape character (defaults to quote value)
        newline: '\n',  // specify a newline character
        headers: ['date', 'reference', 'amount', 'retailer', 'processDate'] // Specifing the headers
    }
};

module.exports = config;