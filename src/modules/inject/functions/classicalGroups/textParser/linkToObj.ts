const linkToObj = (link: any[]) => {
  return {
    match: link[0],
    scheme: link[1] || "http://",
    host: link[2],
    domain: link[4],
    trail: link[6] || "",
  };
};

export default linkToObj;
