const extractVideoPart = (href: string | string[] | null | undefined) => {
  const videoIndex = href?.indexOf('video');
  if (videoIndex === -1) return null;
    if (videoIndex) {
        const videoPart = href?.slice(videoIndex + 5);
        return videoPart;
    }
}

export default extractVideoPart;