const fs = require('fs');

function checkIfActionIsValid(action) {

    if (action && (action === "encode" || action === "decode")) return;

    console.error("error: wrong 'action' option value, must be 'encode' or 'decode'");
    process.exit(1);

}
function checkIfShiftIsValid(shift) {
    if (shift && Number.isInteger(+shift) && +shift < 26 && +shift >= 0) return;

    console.error("error: wrong 'shift' option value, must be an integer number between 0(inclusive) and 26(not inclusive)");
    process.exit(1);
}

function checkCipherFunctionParams(action, shift, input) {

    checkIfActionIsValid(action);
    checkIfShiftIsValid(shift);

    if (!input) {
        console.error("error: wrong value from input file, must be a string");
        process.exit(1);
    }
}

function checkIfFileIsAvailable(file) {
    // Check if the file exists in the current directory.
    try {
        fs.accessSync(file, fs.constants.F_OK);
    } catch (err) {
        console.error(`error: file '${file}' does not exist`);
        process.exit(1);
    }

    // Check if the file is readable.
    try {
        fs.accessSync(file, fs.constants.R_OK);
    } catch (err) {
        console.error(`error: file '${file}' is not readable`);
        process.exit(1);
    }

    // Check if the file is writable.
    try {
        fs.accessSync(file, fs.constants.W_OK);
    } catch (err) {
        console.error(`error: file '${file}' is not writable`);
        process.exit(1);
    }


    try {
        fs.accessSync(file, file, fs.constants.F_OK | fs.constants.W_OK,);
    } catch (err) {
        console.error(`error: file '${file}' ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
        process.exit(1);
    }

}

module.exports = {
    checkCipherFunctionParams,
    checkIfFileIsAvailable
}