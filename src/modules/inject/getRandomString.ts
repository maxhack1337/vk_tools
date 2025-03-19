export function getRandomString() {
    var length = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 6;
    var source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = [];
    for(var i = 0; i < length; i++){
        result.push(source.charAt(Math.floor(Math.random() * source.length)));
    }
    return result.join("");
}