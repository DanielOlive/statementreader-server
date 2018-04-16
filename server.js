/**
 * Created by dolive on 5/20/16.
 */
var config = require('./config');
var statementReader = require('./services/statementReader');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express();
var hbs = require('hbs');
var reader = statementReader();
var partialLoader = require('./services/partial-loader')();
var multer = require('multer');
var upload = multer({dest: './uploads/'});


app.use(cors())
app.use(bodyParser.json());
app.use(express.static('../public'));
app.use(express.static('../public/views/'));
app.set('view engine', 'hbs');


app.post('/upload', upload.single('avatar'), function (req, res) {

    var filepath = req.file.destination + req.file.filename;

    reader.importCSVFile(filepath, function (val) {
        //res.redirect('/');
    });

    res.redirect('/');
    res.status(204).end();
});

app.get('/transactions', function (req, res) {

    reader.getJsonFile(function (data) {
        var obj = {
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
