const searchHashes = (str: string) => {
  let hashesObject = null;
  const regex = /"hashes":\s*({[\s\S]*?})/;
  const match = str.match(regex);
  if (match && match[1]) {
    try {
      hashesObject = JSON.parse(match[1]);
      return hashesObject;
    } catch (error) {
      console.error("[VK Tools hashes Error]", error);
    }
  }
}

export default searchHashes;