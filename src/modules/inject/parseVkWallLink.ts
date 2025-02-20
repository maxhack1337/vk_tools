const parseVkWallLink = (url:string) => {
  try {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url; 
    }

    const urlObject = new URL(url);
    const pathname = urlObject.pathname;
    const parts = pathname.split('/').pop()!.split('_');

    if (parts.length === 2) {
      const oid = parseInt(parts[0].replace('wall', ''), 10);
      const id = parseInt(parts[1], 10);
      return { oid: oid, id };
    }

    if (pathname.startsWith('/wall')) {
      const match = pathname.match(/\/wall(-?\d+)_(\d+)/);
      if (match) {
        return {
          oid: parseInt(match[1], 10),
          id: parseInt(match[2], 10)
        };
      }
    }

    return null; 
  } catch (error) {
    console.error("Invalid URL:", url);
    return null; 
  }
}

export default parseVkWallLink;