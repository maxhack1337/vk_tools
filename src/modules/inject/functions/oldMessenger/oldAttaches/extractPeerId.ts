const extractPeerId = (url: string) => {
  const regex = /vk\.com\/im\/convo\/(-?\d+)/;
  const match = url.match(regex);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  return null;
}

export default extractPeerId;