module.exports = function cipher(action, shift, input) {
    const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
    if (!action || !shift || !input || isNaN(Number.parseFloat(shift))) {
        console.error("error: Wrong parameter (action or shift or input) value. Change command and try again.");
        process.exit(1);
    };

    return input
        .split("").map(symbol => {
            console.log(input, symbol);
            let capital = (symbol === symbol.toUpperCase())
            let index = ALPHABET.indexOf(symbol.toLowerCase());
            console.log(index, shift);
            if (~index) {
                if (action === "encode") index += +shift;
                console.log(index);
                if (action === "decode") index -= +shift;
                console.log(index);
                if (index >= 26) index -= 26;
                if (index < 0) index = 26 - index;
                console.log(index);
                symbol = ALPHABET[index];
            }
            console.log(symbol);
            return capital
                ? symbol.toUpperCase()
                : symbol;
        }).join("");
}
