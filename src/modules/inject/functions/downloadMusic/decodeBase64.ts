import base64Chars from "./base64Chars";

const decodeBase64 = (input: string): string | false => {
    if (!input || input.length % 4 === 1) return false;

    let output = "";
    let buffer = 0;
    let bits = 0;

    for (const char of input) {
        const index = base64Chars.indexOf(char);
        if (index === -1) continue;

        buffer = (buffer << 6) | index;
        bits += 6;

        while (bits >= 8) {
            output += String.fromCharCode((buffer >>> (bits - 8)) & 0xFF);
            bits -= 8;
        }
    }

    return output;
}

export default decodeBase64;