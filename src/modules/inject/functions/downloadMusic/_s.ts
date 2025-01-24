/* eslint-disable no-sequences */
/* eslint-disable @typescript-eslint/no-unused-expressions */
const _s = (t: any, e: number) => {
  var i = t.length,
    o = [];
  if (i) {
    var a = i;
    for (e = Math.abs(e); a--; )
      (e = ((i * (a + 1)) ^ (e + a)) % i), (o[a] = e);
  }
  return o;
};

export default _s;
