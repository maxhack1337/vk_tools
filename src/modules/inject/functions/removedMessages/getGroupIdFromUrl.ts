function extractGroupIdFromUrl() {
  const url = window.location.href;
  const match = url.match(/gim(\d+)/);
  if (match) {
    return Number(match[1]);
  }
  return 0;
}

export default extractGroupIdFromUrl;
