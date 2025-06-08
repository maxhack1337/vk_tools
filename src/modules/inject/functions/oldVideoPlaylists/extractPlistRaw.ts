const extractPlistRaw = (url: string) => {
  const match = url.match(/\/playlist\/([^\/\?]+)/);
  return match ? match[1] : "1_1";
};

export default extractPlistRaw;
