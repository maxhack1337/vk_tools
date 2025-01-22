const _r = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=';

const _a = (t: string) => {
    if (!t || t.length % 4 === 1) return ''
    for (var e: number, i, o = 0, a = 0, s = ''; (i = t.charAt(a++)); )
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (i = _r.indexOf(i)),
            ~i &&
                ((e = o % 4 ? 64 * e! + i : i), o++ % 4) &&
                (s += String.fromCharCode(255 & (e >> ((-2 * o) & 6))))
    return s
}
export default _a
