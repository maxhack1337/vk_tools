import getNearestPost from "../oldPosting/getNearestPost";
import openCommentsInWkLayer from "./openCommentsInWkLayer";

const handlePostBottomClick = (e: MouseEvent) => {
  const target = e.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }
  const postEl = getNearestPost(target);
  const postId = postEl?.getAttribute("data-post-id");
  if (!(postId && postEl)) {
    return;
  }
  const isRepliesNextButtonEl = target.classList.contains("replies_next_inline");
  const isPostCommentsDisabled = postEl.getAttribute("data-post-comments-disabled") === "true";
  openCommentsInWkLayer(postId, target, {
    isPostCommentsDisabled,
    isInlineCommentsEnabled: false,
    isInputFocusDisabled: isRepliesNextButtonEl,
    clickSource: "comments_button",
  });
};

export default handlePostBottomClick;
