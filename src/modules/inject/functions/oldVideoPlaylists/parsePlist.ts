import searchFiber from "../../search/searchFiber";

const parsePlist = async (video: HTMLElement) => {
  try {
    const plistFiber = searchFiber(video);
    if (plistFiber) {
      return plistFiber.fiber.memoizedProps.children.props;
    } else {
      throw new Error("Invalid structure of plist");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default parsePlist;
