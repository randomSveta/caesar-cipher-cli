#!/usr/bin/env node
module.exports = function () {
    const { program } = require('commander');

    program
        .storeOptionsAsProperties(false)
        .passCommandToAction(false)

    program
        .version('0.0.1')
        .name('my_caesar_cipher')
        .requiredOption('-a, --action <type>', 'an action encode / decode')
        .requiredOption('-s, --shift <number>', ' a shift')
        .option('-i, --input <file_name_input>', 'an input file')
        .option('-o, --output <file_name_output>', 'an output file')
        .parse(process.argv)

    return program.opts();
}


