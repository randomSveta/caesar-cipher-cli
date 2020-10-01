const fs = require('fs');

function checkCipherFunctionParams(action, shift, input) {
    let parameter = "command"
    let errorMessage = `error: Wrong cipher(action. shift, input) function parameter value. Change "${parameter}" parameter and try again.`
    if (!action) {
        parameter = "action";
        console.error(errorMessage);
        process.exit(1);
    }
    if (!shift || isNaN(Number.parseFloat(shift))) {
        parameter = "shift";
        console.error(errorMessage);
        process.exit(1);
    }
    if (!input) {
        parameter = "input";
        console.error(errorMessage);
        process.exit(1);
    }


}

function checkIfFileIsAvailable(file) {
    // Check if the file exists in the current directory.
    try {
        fs.accessSync(file, fs.constants.F_OK);
    } catch (err) {
        console.error(`error: ${file} does not exist`);
        process.exit(1);
    }

    // Check if the file is readable.
    try {
        fs.accessSync(file, fs.constants.R_OK);
    } catch (err) {
        console.error(`error: ${file} is not readable`);
        process.exit(1);
    }

    // Check if the file is writable.
    try {
        fs.accessSync(file, fs.constants.W_OK);
    } catch (err) {
        console.error(`error: ${file} is not writable`);
        process.exit(1);
    }


    try {
        fs.accessSync(file, file, fs.constants.F_OK | fs.constants.W_OK,);
    } catch (err) {
        console.error(`error: ${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
        process.exit(1);
    }

}

module.exports = {
    checkCipherFunctionParams,
    checkIfFileIsAvailable
}