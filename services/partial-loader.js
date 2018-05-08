
import fs from 'fs'
import hbs from 'hbs'
import path from 'path'
import config from '../config'

let filenames = null;

module.exports = ()=>{

    const partialsDir = path.resolve(__dirname,config.partialPath);

    filenames = fs.readdirSync(partialsDir);
    filenames.forEach((filename) => {
        const matches = /^([^.]+).hbs$/.exec(filename);
        if (!matches) {
            return;
        }
        const name = matches[1];
        const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
        hbs.registerPartial(name, template);
    });

}