// ./bin/my_caesar_cli.js

const { pipeline } = require('stream');
const { CaesarCipherTransform } = require('./CaesarCipherTransform')
const optionsCLI = require('./options');
const fs = require('fs');

const receivedOptions = optionsCLI();

const readable = fs.createReadStream(receivedOptions.input);
const writable = fs.createWriteStream(receivedOptions.output);

pipeline(
    readable,
    new CaesarCipherTransform(receivedOptions.action, receivedOptions.shift),
    writable,
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.');
        }
    }
)