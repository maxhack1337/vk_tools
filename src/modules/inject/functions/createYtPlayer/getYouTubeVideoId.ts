const getYouTubeVideoId = (url: string) => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("youtu.be")) {
      return urlObj.pathname.slice(1).split(/[?&]/)[0];
    }

    if (urlObj.hostname.includes("youtube.com")) {
      const v = urlObj.searchParams.get("v");
      if (v) return v;
      const pathMatch = urlObj.pathname.match(/\/(embed|v|shorts|live)\/([^?&/]+)/);
      if (pathMatch && pathMatch[2]) return pathMatch[2];
    }
    return null;
  } catch (e) {
    return null;
  }
};

export default getYouTubeVideoId;
