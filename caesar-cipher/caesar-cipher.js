const { checkCipherFunctionParams } = require("./error-handler")

function cipher(action, shift, input) {
    const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

    checkCipherFunctionParams(action, shift, input);

    return input
        .split("").map(symbol => {

            let capital = (symbol === symbol.toUpperCase())
            let index = ALPHABET.indexOf(symbol.toLowerCase());

            if (~index) {
                if (action === "encode") index += +shift;
                if (action === "decode") index -= +shift;

                if (index >= 26) index -= 26;
                if (index < 0) index = 26 + index; // + because value is negative

                symbol = ALPHABET[index];
            }
            if (!symbol) {
                console.error("error: ")
            }
            return capital
                ? symbol.toUpperCase()
                : symbol;
        }).join("");
}
module.exports = {
    cipher,
}