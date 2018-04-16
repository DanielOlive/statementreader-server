/**
 * Created by dolive on 5/30/16.
 */

var fs = require('fs');
var hbs = require('hbs');
var filenames = null;
var path = require('path');
var config = require('../config');

//console.log(partialsDir);

module.exports = ()=>{

    var partialsDir = path.resolve(__dirname,config.partialPath);

    filenames = fs.readdirSync(partialsDir);
    filenames.forEach((filename) => {
        var matches = /^([^.]+).hbs$/.exec(filename);
        if (!matches) {
            return;
        }
        var name = matches[1];
        var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
        hbs.registerPartial(name, template);
    });
}