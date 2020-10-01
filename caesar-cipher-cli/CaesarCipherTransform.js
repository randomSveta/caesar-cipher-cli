const { Transform } = require('stream');
const { StringDecoder } = require('string_decoder');
const cipher = require('./cipher');

class CaesarCipherTransform extends Transform {
    constructor(action, shift) {
        super(action, shift)

        this.action = action;
        this.shift = shift;
        // The stream will have Buffer chunks. The
        // decoder converts these to String instances.
        this._decoder = new StringDecoder('utf-8')
    }

    _transform(chunk, encoding, callback) {
        // Convert the Buffer chunks to String.
        if (encoding === 'buffer') {
            chunk = this._decoder.write(chunk)
        }

        // Exit on CTRL + C.
        if (chunk === '\u0003') {
            process.exit()
        }

        //change
        chunk = cipher(this.action, this.shift, chunk);

        // Pass the chunk on.
        callback(null, chunk)
    }
}

module.exports =
{
    CaesarCipherTransform
}