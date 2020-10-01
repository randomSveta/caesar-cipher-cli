// ./bin/my_caesar_cli.js

const { pipeline } = require('stream');
const { CaesarCipherTransform } = require('./CaesarCipherTransform');
const optionsCLI = require('./options');
const fs = require('fs');

const receivedOptions = optionsCLI();

const readable = receivedOptions.input ? fs.createReadStream(receivedOptions.input) : process.stdin;
const writable = receivedOptions.output ? fs.createWriteStream(receivedOptions.output, { flags: "a" }) : process.stdout;

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