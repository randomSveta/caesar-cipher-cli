// ./bin/caesar-cipher-cli.js

const { pipeline } = require('stream');
const { CaesarCipherTransform } = require('./CaesarCipherTransform');
const optionsCLI = require('./cli-options');
const { checkIfFileIsAvailable } = require('./error-handling');
const fs = require('fs');

const receivedOptions = optionsCLI();

let readable = process.stdin;
if (receivedOptions.hasOwnProperty("input")) {
    checkIfFileIsAvailable(receivedOptions.input);
    readable = fs.createReadStream(receivedOptions.input);
}

const transform = new CaesarCipherTransform(receivedOptions.action, receivedOptions.shift);

let writable = process.stdout;
if (receivedOptions.hasOwnProperty("output")) {
    checkIfFileIsAvailable(receivedOptions.output);
    writable = fs.createWriteStream(receivedOptions.output, { flags: "a" });
}

pipeline(
    readable,
    transform,
    writable,
    (err) => {
        if (err) {
            console.error('Pipeline failed.\n', "error:" + err.message);
        } else {
            console.log('Pipeline succeeded.');
        }
    }
)