import getNearestPost from "./getNearestPost";

const getPostIdFromPost = (inPostElement: HTMLElement) => {
  const postElement = getNearestPost(inPostElement);
  const postId = postElement?.getAttribute("data-post-id");
  return postId ?? null;
};

export default getPostIdFromPost;
