const isLinkInComment = (target: HTMLElement) => {
  return target?.closest(".wall_reply_text a");
};

export default isLinkInComment;
