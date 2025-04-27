import searchFiber from "./searchFiber";

const parsePropsVideo = async (video: HTMLElement) => {
  try {
    const videoFiber = searchFiber(video);
    if (videoFiber) {
      return videoFiber.fiber.return.memoizedProps;
    } else {
      throw new Error("Invalid structure of rootProfile");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default parsePropsVideo;
