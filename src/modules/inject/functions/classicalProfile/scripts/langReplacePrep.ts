        const langReplacePrep = (e: string | string[], t: string) => {
          if (!t) return e;
          const n = window.langConfig.prep;
          if (n.length) {
            const r = n
              .map((t: [any, any, any]) => {
                const [n, r, o] = t,
                  [i, a] = n.split(","),
                  [s, l] = o.split(","),
                  c = Array.isArray(e) ? new RegExp(i).test(e[0]) : new RegExp(i).test(e),
                  u = Array.isArray(e) ? new RegExp(a).test(e[0]) : new RegExp(a).test(e);
                return c ? [i, r, s] : !!u && [a, r, l];
              })
              .filter((e: any) => !!e);
            if (2 === r.length) {
              const [n, o] = r,
                [i, a, s] = o;
              if (
                !a.split(",").find((e: string) => {
                  const n = e.replace("*", "");
                  return n && new RegExp(`^${n}`).test(t);
                })
              ) {
                const [r, o, i] = n;
                if (
                  o.split(",").find((e: string) => {
                    const n = e.replace("*", "");
                    return n && new RegExp(`^${n}`).test(t);
                  })
                )
                  return Array.isArray(e) ? e[0].replace(r, i) : e.replace(r, i);
              }
              return Array.isArray(e) ? e[0].replace(i, s) : e.replace(i, s);
            }
          }
          return e;
}
        
export default langReplacePrep;