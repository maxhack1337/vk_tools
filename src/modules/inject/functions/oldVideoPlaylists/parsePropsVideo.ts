import searchFiber from "../../search/searchFiber";
import findOwner from "./findOwner";

const parsePropsVideo = async (video: HTMLElement) => {
  try {
    const videoFiber = searchFiber(video);
    if (videoFiber) {
      let memoizedProps = videoFiber.fiber.return.memoizedProps;
      return findOwner(memoizedProps);
    } else {
      throw new Error("Invalid structure of video");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default parsePropsVideo;
