import createEmojiSmileWrap from "./createEmojiSmileWrap";
import postingFooterBlock from "./postingFooterBlock";
import postingWarningTooMuchSymbols from "./postingWarningTooMuchSymbols";

const postingWrap = (fromOid: any, isUser: boolean, isMyWall: boolean, isSuggested: boolean, onlyOfficial: boolean) => {
  const postingWrapElement = document.createElement("div");
  postingWrapElement.classList.add("post_field_wrap", "_emoji_field_wrap");

  const emojiAddButton = createEmojiSmileWrap();

  postingWrapElement.appendChild(emojiAddButton);

  const postFooter = postingFooterBlock(fromOid, isUser, isMyWall, isSuggested, onlyOfficial);

  postingWrapElement.appendChild(postFooter);

  postingWrapElement.appendChild(postingWarningTooMuchSymbols());

  return postingWrapElement;
};

export default postingWrap;
