import getInlineCommentElement from "./getInlineCommentElement";

const openCommentsInWkLayer = (postId: string, target: HTMLElement, options: any) => {
  const postIdMatches = postId.match(/^(-?\d+)_(wall)?(\d+)$/);
  if (!postIdMatches) {
    return;
  }
  const inlineComment = getInlineCommentElement(target);
  const replyId = inlineComment?.id.split("_")[1];
  const trackCode = "vkTools";
  const postPath = `wall${postIdMatches[1]}_${postIdMatches[3]}`;
  window.Wall.postFull(postPath, false, {
    isPostCommentsDisabled: options.isPostCommentsDisabled,
    isInlineCommentsEnabled: options.isInlineCommentsEnabled,
    isInputFocusEnabled: options.isPostCommentsDisabled && !options.isInputFocusDisabled,
    reply: options.isInlineCommentsEnabled ? replyId : null,
    clickSource: options.clickSource,
    trackCode,
  });
};

export default openCommentsInWkLayer;
