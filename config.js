/**
 * Created by dolive on 6/9/16.
 */

const config = {
  database: './data/data.json',
  csvFile: './data02.csv',
  partialPath: '../views/partials/',
  transactionPath: 'http://localhost:3020/api/transactions',
  error: {
    uploadfile: 'Please upload a file'
  },
  csvDefaults: {
    raw: false, // do not decode to utf-8 strings
    separator: ',', // specify optional cell separator
    quote: '"', // specify optional quote character
    escape: '"', // specify optional escape character (defaults to quote value)
    newline: '\n', // specify a newline character,
    header: ['date', 'reference', 'amount', 'retailer', 'processDate'] // Specifing the headers
  },
  csvOptions: {
    auto_parse_date: true,
    cast_date: true
  },
  headers: {
    amex: ['date', 'reference', 'amount', 'retailer', 'processDate'], // Specifing the headers
    halifax: ['date', 'processDate', 'reference', 'retailer', 'amount'] // Specifing the headers
  }
};

module.exports = config;
