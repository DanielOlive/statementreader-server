
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import hbs from 'hbs'
import multer from 'multer'

import {importCSVFile, getJsonFile} from './services/statementReader.js'

const config = require('./config');
const app = express();
const partialLoader = require('./services/partial-loader')();
const upload = multer({dest: './uploads/'});


app.use(cors())
app.use(bodyParser.json());
app.use(express.static('../public'));
app.use(express.static('../public/views/'));
app.set('view engine', 'hbs');


app.post('/upload', upload.single('file'), (req, res) => {
    const filepath = req.file.destination + req.file.filename;
    importCSVFile(filepath);
    res.status(204).end();
});

app.get('/transactions', function (req, res) {

    getJsonFile(function (data) {
        const obj = {
                list: data.account,
                title: 'Transactions'
        };

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(obj));
        // res.render('index', obj);
    });
});

var server = app.listen(3020, function () {
    console.log('Server started on port ' + server.address().port + '...');
});
