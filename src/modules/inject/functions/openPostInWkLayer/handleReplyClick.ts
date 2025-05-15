import getNearestPost from "../oldPosting/getNearestPost";
import isLinkInComment from "./isLinkInComment";
import openCommentsInWkLayer from "./openCommentsInWkLayer";

const handleReplyClick = (e: MouseEvent) => {
  if (window.cur.editingPost) {
    return;
  }
  const target = e.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }
  if (isLinkInComment(target)) {
    return;
  }
  const postEl = getNearestPost(target);
  const postId = postEl?.getAttribute("data-post-id");
  if (!(postId && postEl)) {
    return;
  }

  const isInlineCommentsEnabled = postEl?.getAttribute("data-post-inline-comments") === "true";
  openCommentsInWkLayer(postId, target, {
    isPostCommentsDisabled: false,
    isInlineCommentsEnabled,
    clickSource: "inline_comment",
  });
};

export default handleReplyClick;
