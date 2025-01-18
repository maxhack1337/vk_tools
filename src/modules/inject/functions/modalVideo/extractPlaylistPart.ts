const extractPlaylistPart = (href: string | string[] | null | undefined) => {
  const videoIndex = href?.indexOf('video');
  if (videoIndex === -1) return null;
    if (videoIndex) {
        const playlistPart = href?.slice(10, videoIndex - 1);
        return playlistPart;
    }
}

export default extractPlaylistPart;