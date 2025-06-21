const getLinkImageMaxSizeUrl = (sizes: any) => {
  const availableSizes = ["a", "b", "i", "p", "q", "s", "w", "z", "y", "x", "r", "o", "m", "g", "max", "l", "f", "k", "c", "e", "d", "j", "temp", "h", "n", "base"];
  let n = null,
    e = 0;
  let t;
  for (const curSize of sizes) {
    t = curSize.type;
    if (availableSizes.includes(t)) {
      t = (curSize.width || 0) * (curSize.height || 0);
      if (t > e || t === 0) {
        e = t;
        n = curSize;
      }
    }
  }
  let maxSizer = t[0] || n;
  return maxSizer.url;
};

export default getLinkImageMaxSizeUrl;
