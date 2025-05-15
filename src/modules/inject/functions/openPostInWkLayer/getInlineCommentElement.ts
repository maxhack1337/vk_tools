const getInlineCommentElement = (replyEl: HTMLElement) => {
  return replyEl?.closest(".reply");
};

export default getInlineCommentElement;
