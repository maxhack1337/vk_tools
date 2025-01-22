import _a from './_a'
import _s from './_s';
const _r = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=';
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
    var _l: any = {
        v: function (t: string) {
            return t.split('').reverse().join('')
        },
        r: function (t: { [x: string]: any; split: (arg0: string) => any; length: any; join: (arg0: string) => any; }, e: number) {
            t = t.split('')
            for (var i, o = _r + _r, a = t.length; a--;)
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                (i = o.indexOf(t[a])), ~i && (t[a] = o.substr(i - e, 1))
            return t.join('')
        },
        s: function (t: any, e: any) {
            var i = t.length
            if (i) {
                var o = _s(t, e),
                    a = 0
                for (t = t.split(''); ++a < i;)
                    t[a] = t.splice(o[i - 1 - a], 1, t[a])[0]
                t = t.join('')
            }
            return t
        },
        i: function (t: any, e: number) {
            return _l.s(t, e ^ vk.id)
        },
        x: function (t: string, e: any) {
            var i: string[] = []
            return (
                (e = e.charCodeAt(0)),
                each(t.split(''), function (t: any, o: string) {
                    i.push(String.fromCharCode(o.charCodeAt(0) ^ e))
                }),
                i.join('')
            )
        },
};
    
const _o = (t: string) => {
    if (~t.indexOf('audio_api_unavailable')) {
        var e:string[] = t.split('?extra=')[1].split('#'),
				o = "" === e[1] ? [""] : _a(e[1])
			let j: string = _a(e[0]);
			let ooooo: string = j;
        if ('string' != typeof o || !e) return t
        o = o ? o.split(String.fromCharCode(9)) : []
        for (var s, r, n = o.length; n--; ) {
            if (
                ((r = o[n].split(String.fromCharCode(11))),
                (s = r.splice(0, 1, ooooo)[0]),
                !_l[s])
            )
                return t
            e = _l[s].apply(null, r)
        }
        if (e && 'http' === e.toString().substr(0, 4)) return e
    }
    return t
}
export default _o
