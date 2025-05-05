import searchContainer from "../../search/searchContainer";
import findPostProps from "./findPostProps";

const getPostProps = async (currentPostEdit: any) => {
  try {
    const postEditFiber = searchContainer(currentPostEdit);
    if (postEditFiber) {
      const response = findPostProps(postEditFiber.container.memoizedState.element.props.data);
      return `${response.ownerId}_${response.postId}`;
    } else {
      throw new Error("Invalid structure of postEditFiber");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getPostProps;
