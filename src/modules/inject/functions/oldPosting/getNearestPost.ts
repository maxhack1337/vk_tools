export const WEB_WALL_POST_SELECTORS = ".post.Post--redesignV3, .wl_post.Post--redesignV3";

const getNearestPost = (inPostElement: HTMLElement) => {
  return inPostElement?.closest(WEB_WALL_POST_SELECTORS) ?? null;
};

export default getNearestPost;
