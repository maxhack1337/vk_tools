import base64Chars from "./base64Chars";
import decodeBase64 from "./decodeBase64";
import isWbOpen from "./isWbOpen";
import shuffle from "./shuffle";

interface Decoders {
    [key: string]: (input: string, ...args: any[]) => string;
}

const decoders: Decoders = {
    v: (t: string): string => t.split("").reverse().join(""),
    r: (t: string, e: number): string => {
        const o = base64Chars + base64Chars;
        return t.split("").map(char => {
            const i = o.indexOf(char);
            return ~i ? o.substr(i - e, 1) : char;
        }).join("");
    },
    s: (t: string, e: number): string => {
        const i = t.length;
        if (i) {
            const o = shuffle(t, e);
            let a = 0;
            const chars = t.split("");
            for (; ++a < i; ) {
                chars[a] = chars.splice(o[i - 1 - a], 1, chars[a])[0];
            }
            return chars.join("");
        }
        return t;
    },
    i: (t: string, e: number): string => decoders.s(t, e ^ vk.id),
    x: (t: string, e: string): string => {
        const i: string[] = [];
        const charCode = e.charCodeAt(0);
        t.split("").forEach((char, index) => {
            i.push(String.fromCharCode(char.charCodeAt(0) ^ charCode));
        });
        return i.join("");
    }
};

const processUrl = (url: string): string => {
    if (!isWbOpen() && url.includes("audio_api_unavailable")) {
        const parts = url.split("?extra=");
        if (parts.length !== 2) return url;

        const extraParts = parts[1].split("#");
        const hashPart = extraParts[1] === "" ? "" : decodeBase64(extraParts[1]);
        let encodedPart = decodeBase64(extraParts[0]);

        if (typeof hashPart !== "string" || !encodedPart) return url;

        const params = hashPart ? hashPart.split(String.fromCharCode(9)) : [];
        for (let param of params) {
            const [key, ...values] = param.split(String.fromCharCode(11));
            if (!decoders[key]) return url;
            encodedPart = decoders[key](encodedPart, ...values);
        }

        if (encodedPart && encodedPart.startsWith("http")) return encodedPart;
    }
    return url;
}

export default processUrl;