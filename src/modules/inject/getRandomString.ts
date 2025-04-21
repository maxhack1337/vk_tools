export function getRandomString() {
    let length = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 6;
    let source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = [];
    for(let i = 0; i < length; i++){
        result.push(source.charAt(Math.floor(Math.random() * source.length)));
    }
    return result.join("");
}